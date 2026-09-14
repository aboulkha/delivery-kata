export default function ReservationForm({
  methods,
  method,
  date,
  loading,
  onMethodChange,
  onDateChange,
  onLoadSlots,
  prettyMethodName,
  texts,
}) {
  return (
    <section className="control-bar">
      <label className="field">
        <span>{texts.method}</span>
        <select value={method} onChange={(e) => onMethodChange(e.target.value)}>
          {methods.map((m) => (
            <option key={m.id} value={m.id}>
              {prettyMethodName(m)}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>{texts.date}</span>
        <input type="date" value={date} onChange={(e) => onDateChange(e.target.value)} />
      </label>

      <button className="primary-button" onClick={onLoadSlots} disabled={loading || !method}>
        {loading ? texts.loading : texts.loadSlots}
      </button>
    </section>
  )
}
