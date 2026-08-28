import { events } from "@/lib/events";

export function EventsSection() {
  return (
    <div className="mb-10">
      <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-bold text-foreground">
        Events
      </h2>
      {events.length === 0 ? (
        <p className="text-[14px] text-dim">No events yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const card = (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="aspect-[4/3] w-full rounded-lg object-cover"
                />
                <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <div className="text-[15px] font-semibold text-foreground">{event.title}</div>
                  <div className="shrink-0 text-[13px] text-subtle">{event.date}</div>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{event.description}</p>
              </>
            );
            return event.url ? (
              <a key={event.slug} href={event.url} target="_blank" rel="noreferrer" className="group block">
                {card}
              </a>
            ) : (
              <div key={event.slug}>{card}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
