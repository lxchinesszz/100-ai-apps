import { useRef, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Button, DatePicker, Input, Stepper, Toast } from "antd-mobile";
import { ArrowLeft, ArrowRight, MapPin, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../data/db";
import { repo, errorMessage } from "../../data/repository";
import {
  dateLabel,
  inputMoney,
  parseMoney,
  todayDate,
  toLocalDate,
} from "../../domain/budget";
import { coverKeys, type CoverKey, type Trip } from "../../domain/model";
import { InlineError, Loading, MissingTrip } from "../../components/shared";
import { useDraftGuard } from "../../app/context";

function Editor({ initial }: { initial?: Trip }) {
  const navigate = useNavigate();
  const [id] = useState(() => initial?.id ?? crypto.randomUUID());
  const [destination, setDestination] = useState(initial?.destination ?? "");
  const [start, setStart] = useState(initial?.startDate ?? todayDate());
  const [end, setEnd] = useState(initial?.endDate ?? todayDate());
  const [people, setPeople] = useState(initial?.people ?? 1);
  const [budget, setBudget] = useState(
    initial ? inputMoney(initial.budgetCents) : "",
  );
  const [cover, setCover] = useState<CoverKey>(initial?.coverKey ?? "coast");
  const [picker, setPicker] = useState<"start" | "end" | null>(null);
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const saving = useRef(false);
  const initialValues = useRef(
    JSON.stringify([destination, start, end, people, budget, cover]),
  );
  const dirty =
    JSON.stringify([destination, start, end, people, budget, cover]) !==
    initialValues.current;
  useDraftGuard(dirty, busy);
  const back = () => navigate(initial ? `/trips/${initial.id}` : "/");
  function cancel() {
    if (!busy) back();
  }
  async function save() {
    if (saving.current) return;
    saving.current = true;
    setBusy(true);
    setError("");
    try {
      const now = new Date().toISOString();
      await repo.saveTrip(
        {
          id,
          destination: destination.trim(),
          startDate: start,
          endDate: end,
          people,
          budgetCents: parseMoney(budget),
          coverKey: cover,
          currency: "CNY",
          createdAt: initial?.createdAt ?? now,
          updatedAt: now,
        },
        !!initial,
      );
      Toast.show(initial ? "旅行已更新" : "新的旅程，出发吧");
      navigate(`/trips/${id}`, { replace: true });
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      saving.current = false;
      setBusy(false);
    }
  }
  return (
    <main className="page form-page">
      <header className="topbar">
        {initial ? (
          <button className="text-button" onClick={cancel} disabled={busy}>
            取消
          </button>
        ) : (
          <button
            className="icon-button"
            aria-label="返回旅行列表"
            onClick={cancel}
            disabled={busy}
          >
            <ArrowLeft size={23} aria-hidden="true" />
          </button>
        )}
        <span />
        <span className="step-label">{initial ? "旅行设置" : "新的开始"}</span>
      </header>
      <h1>{initial ? "编辑旅行" : "新的旅行"}</h1>
      <p className="heading-subtitle">用一个预算，开启一段美好的旅程。</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        <div className="field">
          <label htmlFor="destination">去哪儿</label>
          <div className="filled-input">
            <Input
              id="destination"
              aria-label="目的地"
              placeholder="想去的地方"
              value={destination}
              maxLength={40}
              onChange={setDestination}
            />
            <MapPin size={21} className="muted" />
          </div>
        </div>
        <div className="field">
          <label>日期</label>
          <div className="date-range">
            <button
              type="button"
              className="date-box"
              aria-label="选择出发日期"
              onClick={() => setPicker("start")}
            >
              <strong>{dateLabel(start)}</strong>
              <span>{start.slice(0, 4)} · 出发</span>
            </button>
            <ArrowRight size={21} className="muted" />
            <button
              type="button"
              className="date-box"
              aria-label="选择返回日期"
              onClick={() => setPicker("end")}
            >
              <strong>{dateLabel(end)}</strong>
              <span>{end.slice(0, 4)} · 返回</span>
            </button>
          </div>
        </div>
        <div className="field">
          <label>人数</label>
          <div className="people-input">
            <Stepper
              min={1}
              max={99}
              value={people}
              onChange={setPeople}
              digits={0}
            />
            <span className="people-value" aria-hidden>
              {people} 人
            </span>
          </div>
        </div>
        <div className="field">
          <div className="field-label">
            <label htmlFor="budget">旅行预算</label>
            <span>整趟旅行总预算</span>
          </div>
          <div className="budget-input">
            <span>¥</span>
            <Input
              id="budget"
              aria-label="旅行预算"
              inputMode="decimal"
              placeholder="0"
              value={budget}
              onChange={setBudget}
            />
          </div>
        </div>
        <div className="field cover-field">
          <div className="field-label">
            <label>旅途封面</label>
            <span>选一种心情</span>
          </div>
          <div className="cover-options">
            {coverKeys.map((key, index) => (
              <button
                key={key}
                type="button"
                className={`cover-option ${cover === key ? "selected" : ""}`}
                aria-label={`选择${["海岸", "城市", "远山", "湖泊"][index]}封面`}
                aria-pressed={cover === key}
                onClick={() => setCover(key)}
              >
                <img
                  src={`${import.meta.env.BASE_URL}covers/${key}.svg`}
                  alt=""
                />
                {cover === key && (
                  <span>
                    <Check size={12} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        {error && <InlineError message={error} />}
        <div className="form-action">
          <Button
            block
            color="primary"
            className="black-button"
            size="large"
            type="submit"
            loading={busy}
            disabled={!destination.trim() || !budget || busy}
          >
            {initial ? "保存修改" : "创建旅行"}
          </Button>
        </div>
      </form>
      <DatePicker
        title={picker === "start" ? "出发日期" : "返回日期"}
        visible={!!picker}
        value={toLocalDate(picker === "end" ? end : start)}
        min={picker === "end" ? toLocalDate(start) : new Date(1900, 0, 1)}
        max={new Date(2199, 11, 31)}
        onClose={() => setPicker(null)}
        onConfirm={(date) => {
          const value = todayDate(date);
          if (picker === "start") {
            setStart(value);
            if (value > end) setEnd(value);
          } else setEnd(value);
        }}
      />
    </main>
  );
}
export default function TripForm() {
  const { id } = useParams();
  const data = useLiveQuery(
    async () => ({ trip: id ? await db.trips.get(id) : undefined }),
    [id],
  );
  if (!data) return <Loading />;
  if (id && !data.trip) return <MissingTrip />;
  return <Editor key={id ?? "new"} initial={data.trip} />;
}
