import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  Input,
  NumberKeyboard,
  Popup,
  Toast,
} from "antd-mobile";
import { CalendarDays, ChevronDown, X } from "lucide-react";
import {
  categories,
  categoryNames,
  type Trip,
  type Expense,
  type Category,
} from "../../domain/model";
import {
  inputMoney,
  localTime,
  parseMoney,
  todayDate,
} from "../../domain/budget";
import { repo, errorMessage } from "../../data/repository";
import {
  CategoryIcon,
  confirmDiscard,
  InlineError,
} from "../../components/shared";
import { useDraftGuard } from "../../app/context";

export default function ExpenseSheet({
  trip,
  expense,
  onClose,
}: {
  trip: Trip;
  expense?: Expense;
  onClose: () => void;
}) {
  const [id] = useState(() => expense?.id ?? crypto.randomUUID());
  const [amount, setAmount] = useState(
    expense ? inputMoney(expense.amountCents) : "",
  );
  const [category, setCategory] = useState<Category>(
    expense?.category ?? "food",
  );
  const [note, setNote] = useState(expense?.note ?? "");
  const [date, setDate] = useState(
    expense?.spentDate ??
      (todayDate() > trip.endDate ? trip.endDate : todayDate()),
  );
  const [time, setTime] = useState(expense?.spentTime ?? localTime());
  const [keyboard, setKeyboard] = useState(true),
    [advanced, setAdvanced] = useState(false);
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const saving = useRef(false),
    sheet = useRef<HTMLDivElement>(null),
    amountRef = useRef<HTMLButtonElement>(null);
  const [viewHeight, setViewHeight] = useState(
    window.visualViewport?.height ?? window.innerHeight,
  );
  const initial = useRef(JSON.stringify([amount, category, note, date, time]));
  const dirty =
    initial.current !== JSON.stringify([amount, category, note, date, time]);
  useDraftGuard(dirty, busy);
  useEffect(() => {
    const opener = document.activeElement as HTMLElement;
    amountRef.current?.focus();
    const update = () =>
      setViewHeight(window.visualViewport?.height ?? window.innerHeight);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      opener?.focus();
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);
  function input(key: string) {
    setAmount((current) => {
      if (key === "." && current.includes(".")) return current;
      const next =
        key === "." && !current
          ? "0."
          : current === "0" && key !== "."
            ? key
            : current + key;
      return /^\d{0,7}(\.\d{0,2})?$/.test(next) ? next : current;
    });
  }
  async function close() {
    if (!busy && (!dirty || (await confirmDiscard()))) onClose();
  }
  async function save() {
    if (saving.current) return;
    saving.current = true;
    setBusy(true);
    setError("");
    try {
      const now = new Date().toISOString();
      await repo.saveExpense(
        {
          id,
          tripId: trip.id,
          amountCents: parseMoney(amount),
          category,
          note: note.trim(),
          spentDate: date,
          spentTime: time,
          createdAt: expense?.createdAt ?? now,
          updatedAt: now,
        },
        !!expense,
      );
      Toast.show(expense ? "支出已更新" : "记好了");
      onClose();
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      saving.current = false;
      setBusy(false);
    }
  }
  async function remove() {
    if (!expense || busy) return;
    if (
      !(await Dialog.confirm({
        title: "删除这笔支出？",
        content: "删除后，预算和分类合计会重新计算。",
        confirmText: "删除支出",
        cancelText: "保留",
      }))
    )
      return;
    setBusy(true);
    try {
      await repo.deleteExpense(expense.id);
      Toast.show("支出已删除");
      onClose();
    } catch (e) {
      setError(errorMessage(e));
      setBusy(false);
    }
  }
  let valid = false;
  try {
    parseMoney(amount);
    valid = true;
  } catch {
    /* The empty input is an intentional draft state. */
  }
  return (
    <Popup
      visible
      closeOnMaskClick
      onClose={close}
      bodyClassName={`expense-popup ${keyboard ? "with-keyboard" : ""}`}
      bodyStyle={{ maxHeight: viewHeight - 12 }}
    >
      <div
        ref={sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="expense-title"
        className="expense-sheet"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            void close();
          }
          if (e.key === "Tab") {
            const focusable = Array.from(
              sheet.current?.querySelectorAll<HTMLElement>(
                'button:not([disabled]), input, [tabindex="0"]',
              ) ?? [],
            );
            const first = focusable[0],
              last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last?.focus();
            }
            if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first?.focus();
            }
          }
        }}
      >
        <div className="sheet-handle" />
        <div className="sheet-heading">
          <h2 id="expense-title">{expense ? "编辑支出" : "记一笔"}</h2>
          <button
            className="close-button"
            aria-label="关闭记账"
            disabled={busy}
            onClick={close}
          >
            <X size={19} />
          </button>
        </div>
        <button
          ref={amountRef}
          className={`expense-amount ${amount.length > 8 ? "compact-money" : ""}`}
          aria-label="支出金额"
          onClick={() => {
            setKeyboard(true);
            (document.activeElement as HTMLElement)?.blur();
          }}
          onKeyDown={(e) => {
            if (/^[0-9.]$/.test(e.key)) {
              e.preventDefault();
              input(e.key);
            } else if (e.key === "Backspace") {
              e.preventDefault();
              setAmount((s) => s.slice(0, -1));
            }
          }}
        >
          <span>¥</span>
          <strong className={!amount ? "placeholder" : ""}>
            {amount || "0"}
          </strong>
          {keyboard && <i className="amount-cursor" />}
        </button>
        <div className="categories">
          {categories.map((key) => (
            <button
              key={key}
              aria-pressed={category === key}
              aria-label={`分类：${categoryNames[key]}`}
              className={`category-button ${category === key ? "selected" : ""}`}
              onClick={() => setCategory(key)}
            >
              <span>
                <CategoryIcon category={key} size={24} />
              </span>
              {categoryNames[key]}
            </button>
          ))}
        </div>
        <div className="note-field">
          <label htmlFor="expense-note">备注（可选）</label>
          <Input
            id="expense-note"
            aria-label="备注"
            placeholder="这一笔，花在了哪里？"
            value={note}
            maxLength={100}
            onChange={setNote}
            onFocus={() => setKeyboard(false)}
          />
        </div>
        <button
          className="expense-date-toggle"
          aria-expanded={advanced}
          onClick={() => {
            setAdvanced(!advanced);
            setKeyboard(false);
          }}
        >
          <CalendarDays size={14} />
          {date === todayDate() ? "今天" : date} · {time}
          <ChevronDown size={13} />
        </button>
        {advanced && (
          <div className="expense-date-fields">
            <label>
              消费日期
              <input
                type="date"
                aria-label="消费日期"
                value={date}
                min="1900-01-01"
                max="2199-12-31"
                onChange={(e) => setDate(e.target.value)}
                onFocus={() => setKeyboard(false)}
              />
            </label>
            <label>
              时间
              <input
                type="time"
                aria-label="消费时间"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                onFocus={() => setKeyboard(false)}
              />
            </label>
          </div>
        )}
        {error && <InlineError message={error} />}
        <Button
          className="save-expense"
          block
          size="large"
          color="primary"
          onClick={save}
          loading={busy}
          disabled={!valid || busy}
        >
          {expense ? "保存" : "确认"}
          {amount && ` ¥ ${amount}`}
        </Button>
        {expense && (
          <button className="delete-expense" disabled={busy} onClick={remove}>
            删除这笔支出
          </button>
        )}
        {!keyboard && (
          <button
            className="text-button keyboard-return"
            onClick={() => {
              (document.activeElement as HTMLElement)?.blur();
              setKeyboard(true);
            }}
          >
            继续输入金额
          </button>
        )}
        {keyboard && <div className="keyboard-space" />}
        <NumberKeyboard
          visible={keyboard}
          getContainer={null}
          customKey="."
          showCloseButton={false}
          safeArea
          onInput={input}
          onDelete={() => setAmount((s) => s.slice(0, -1))}
        />
      </div>
    </Popup>
  );
}
