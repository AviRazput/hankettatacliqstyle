export function SectionHeading({
  title,
  subtitle,
  align = "left",
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={[
        "mb-4 md:mb-5",
        align === "center" ? "text-center max-w-xl mx-auto" : "",
      ].join(" ")}
    >
      <h2 className="font-sans text-[1.125rem] md:text-[1.25rem] font-semibold text-[#1a1a1a] tracking-normal">
        {title}
      </h2>
      {subtitle ? <p className="mt-2 text-sm text-flat-muted">{subtitle}</p> : null}
    </div>
  );
}
