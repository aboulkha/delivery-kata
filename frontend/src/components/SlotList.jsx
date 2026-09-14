export default function SlotList({ slots, prettyMethodName, texts, onReserve }) {
  if (slots.length === 0) {
    return (
      <section className="slots-section">
        <div className="empty-state">
          <p>{texts.noSlots}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="slots-section">
      <ul className="slots-list">
        {slots.map((slot) => (
          <li key={slot.id} className={`slot-card ${slot.reserved ? 'is-reserved' : ''}`}>
            <div className="slot-main">
              <div className="slot-time">
                {slot.start} - {slot.end}
              </div>
              <div className="slot-meta">
                <span>{prettyMethodName(slot.method)}</span>
                <span>{slot.date}</span>
              </div>
            </div>

            <div className="slot-status">{slot.reserved ? texts.reserved : texts.available}</div>

            <button
              className="reserve-button"
              onClick={() => onReserve(slot.id)}
              disabled={slot.reserved}
            >
              {slot.reserved ? texts.booked : texts.reserve}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
