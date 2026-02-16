const steps = [
  { label: "Parse Input", desc: "Validate input with Zod schema" },
  { label: "Resolve Context", desc: "Inject dependencies and session data" },
  { label: "beforeAction", desc: "Run middleware hooks (auth, logging)" },
  { label: "Handler", desc: "Execute main server action logic" },
  { label: "afterAction", desc: "Post-processing hooks (audit, metrics)" },
  { label: "Validate Output", desc: "Validate return value with Zod schema" },
  { label: "Revalidate Tags", desc: "Invalidate Next.js cache tags" },
];

export function PipelineDiagram() {
  return (
    <ol>
      {steps.map((step) => (
        <li key={step.label}>
          <strong>{step.label}</strong>
          {`: ${step.desc}`}
        </li>
      ))}
    </ol>
  );
}
