"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";

const INK = "#0a0a0a";
const BG = "#ffffff";
const MUTED = "#949494";
const CORAL = "#c65248";
const LINE_DARK = "rgba(255,255,255,0.18)";
const LINE_DARK_SOFT = "rgba(255,255,255,0.08)";

const TO_EMAIL = "felipegestion03@gmail.com";

type Answers = {
  name: string;
  email: string;
  project: string;
  budget: string;
  message: string;
};

const EMPTY: Answers = {
  name: "",
  email: "",
  project: "",
  budget: "",
  message: "",
};

const TOTAL_STEPS = 5;

export default function ContactForm() {
  const { t, lang } = useLang();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Answers>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (step === 0 || step === 1) inputRef.current?.focus();
      if (step === 4) textareaRef.current?.focus();
    }, 380);
    return () => window.clearTimeout(id);
  }, [step]);

  const update = (k: keyof Answers, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    if (error) setError(null);
  };

  const validate = (): string | null => {
    if (step === 0 && data.name.trim().length < 2) return t.form.steps.name.err;
    if (step === 1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      return t.form.steps.email.err;
    return null;
  };

  const goNext = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const buildMailto = () => {
    const subjectBase =
      lang === "es"
        ? `Nuevo proyecto · ${data.name}`
        : lang === "de"
          ? `Neues Projekt · ${data.name}`
          : `New project · ${data.name}`;

    const L =
      lang === "es"
        ? {
            name: "Nombre",
            email: "Email",
            project: "Tipo de proyecto",
            budget: "Presupuesto",
            message: "Mensaje",
            none: "(sin mensaje)",
            from: "Enviado desde felipecamara.es",
          }
        : lang === "de"
          ? {
              name: "Name",
              email: "E-Mail",
              project: "Projektart",
              budget: "Budget",
              message: "Nachricht",
              none: "(keine Nachricht)",
              from: "Gesendet von felipecamara.es",
            }
          : {
              name: "Name",
              email: "Email",
              project: "Project type",
              budget: "Budget",
              message: "Message",
              none: "(no message)",
              from: "Sent from felipecamara.es",
            };

    const body = [
      `${L.name}: ${data.name}`,
      `${L.email}: ${data.email}`,
      `${L.project}: ${data.project}`,
      `${L.budget}: ${data.budget}`,
      "",
      `${L.message}:`,
      data.message.trim() || L.none,
      "",
      "—",
      L.from,
    ].join("\n");

    return `mailto:${TO_EMAIL}?subject=${encodeURIComponent(
      subjectBase
    )}&body=${encodeURIComponent(body)}`;
  };

  const submit = () => {
    const url = buildMailto();
    window.location.href = url;
    setSent(true);
  };

  const reset = () => {
    setData(EMPTY);
    setStep(0);
    setSent(false);
    setError(null);
    setDirection(1);
  };

  return (
    <div
      style={{
        position: "relative",
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${LINE_DARK}`,
        borderRadius: 24,
        padding: "clamp(28px, 4vw, 48px)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        overflow: "hidden",
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FormHeader
        step={step}
        total={TOTAL_STEPS}
        sent={sent}
        onBack={goBack}
        backLabel={t.form.back}
        stepLabel={t.form.step}
        intro={t.form.intro}
      />

      <div
        style={{
          flex: 1,
          position: "relative",
          marginTop: 28,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          {sent ? (
            <motion.div
              key="success"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <SuccessView
                title={t.form.success.title}
                body={t.form.success.body}
                again={t.form.success.again}
                open={t.form.success.open}
                onAgain={reset}
                onOpen={() => {
                  window.location.href = buildMailto();
                }}
              />
            </motion.div>
          ) : step === 0 ? (
            <motion.div
              key="step-name"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              style={stepBoxStyle}
            >
              <Question text={t.form.steps.name.q} hint={t.form.enterHint} />
              <BigInput
                ref={inputRef}
                value={data.name}
                onChange={(v) => update("name", v)}
                onEnter={goNext}
                placeholder={t.form.steps.name.placeholder}
                autoComplete="name"
              />
              <FieldError msg={error} />
              <FooterNav onNext={goNext} nextLabel={t.form.next} />
            </motion.div>
          ) : step === 1 ? (
            <motion.div
              key="step-email"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              style={stepBoxStyle}
            >
              <Question text={t.form.steps.email.q} hint={t.form.enterHint} />
              <BigInput
                ref={inputRef}
                value={data.email}
                onChange={(v) => update("email", v)}
                onEnter={goNext}
                placeholder={t.form.steps.email.placeholder}
                type="email"
                autoComplete="email"
              />
              <FieldError msg={error} />
              <FooterNav onNext={goNext} nextLabel={t.form.next} />
            </motion.div>
          ) : step === 2 ? (
            <motion.div
              key="step-project"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              style={stepBoxStyle}
            >
              <Question text={t.form.steps.project.q} hint={t.form.pickHint} />
              <ChipGrid
                options={t.form.steps.project.options}
                value={data.project}
                onSelect={(v) => {
                  update("project", v);
                  setDirection(1);
                  window.setTimeout(() => setStep((s) => s + 1), 220);
                }}
              />
            </motion.div>
          ) : step === 3 ? (
            <motion.div
              key="step-budget"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              style={stepBoxStyle}
            >
              <Question
                text={t.form.steps.budget.q}
                sub={t.form.steps.budget.sub}
                hint={t.form.pickHint}
              />
              <ChipGrid
                options={t.form.steps.budget.options}
                value={data.budget}
                onSelect={(v) => {
                  update("budget", v);
                  setDirection(1);
                  window.setTimeout(() => setStep((s) => s + 1), 220);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="step-message"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              style={stepBoxStyle}
            >
              <Question
                text={t.form.steps.message.q}
                hint={t.form.steps.message.optional}
              />
              <BigTextarea
                ref={textareaRef}
                value={data.message}
                onChange={(v) => update("message", v)}
                placeholder={t.form.steps.message.placeholder}
              />
              <Summary data={data} />
              <FooterNav onNext={submit} nextLabel={t.form.send} primary />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Sub-components                                                */
/* ============================================================ */

const stepBoxStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 22,
  flex: 1,
};

const transition = { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] as const };

const slideVariants = {
  enter: (dir: 1 | -1) => ({
    x: dir === 1 ? 40 : -40,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: 1 | -1) => ({
    x: dir === 1 ? -40 : 40,
    opacity: 0,
    position: "absolute" as const,
    inset: 0,
  }),
};

function FormHeader({
  step,
  total,
  sent,
  onBack,
  backLabel,
  stepLabel,
  intro,
}: {
  step: number;
  total: number;
  sent: boolean;
  onBack: () => void;
  backLabel: string;
  stepLabel: (n: number, total: number) => string;
  intro: string;
}) {
  const pct = sent ? 100 : ((step + 1) / total) * 100;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          {sent ? intro : stepLabel(step + 1, total)}
        </span>
        {step > 0 && !sent ? (
          <button
            type="button"
            onClick={onBack}
            style={{
              background: "transparent",
              border: "none",
              color: MUTED,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              padding: "6px 0",
              transition: "color .25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = BG)}
            onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
          >
            ← {backLabel}
          </button>
        ) : (
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {intro}
          </span>
        )}
      </div>
      <div
        style={{
          height: 2,
          background: LINE_DARK_SOFT,
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            height: "100%",
            background: CORAL,
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  );
}

function Question({
  text,
  sub,
  hint,
}: {
  text: string;
  sub?: string;
  hint?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <h3
        style={{
          fontSize: "clamp(26px, 3.6vw, 44px)",
          lineHeight: 1.05,
          fontWeight: 500,
          letterSpacing: "-0.03em",
          margin: 0,
          color: BG,
        }}
      >
        {text}
      </h3>
      {sub ? (
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.6)",
            fontSize: 15,
            lineHeight: 1.4,
            maxWidth: 520,
          }}
        >
          {sub}
        </p>
      ) : null}
      {hint ? (
        <span
          style={{
            color: MUTED,
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          {hint}
        </span>
      ) : null}
    </div>
  );
}

function BigInput({
  ref,
  value,
  onChange,
  onEnter,
  placeholder,
  type = "text",
  autoComplete,
}: {
  ref?: React.Ref<HTMLInputElement>;
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onEnter();
        }
      }}
      placeholder={placeholder}
      autoComplete={autoComplete}
      style={{
        background: "transparent",
        border: "none",
        borderBottom: `1.5px solid ${LINE_DARK}`,
        color: BG,
        fontSize: "clamp(22px, 2.6vw, 32px)",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        padding: "14px 0",
        outline: "none",
        width: "100%",
        transition: "border-color .3s ease",
        fontFamily: "inherit",
      }}
      onFocus={(e) => (e.currentTarget.style.borderBottomColor = CORAL)}
      onBlur={(e) => (e.currentTarget.style.borderBottomColor = LINE_DARK)}
    />
  );
}

function BigTextarea({
  ref,
  value,
  onChange,
  placeholder,
}: {
  ref?: React.Ref<HTMLTextAreaElement>;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      style={{
        background: "transparent",
        border: `1.5px solid ${LINE_DARK}`,
        borderRadius: 14,
        color: BG,
        fontSize: 16,
        lineHeight: 1.5,
        padding: "16px 18px",
        outline: "none",
        width: "100%",
        resize: "vertical",
        fontFamily: "inherit",
        transition: "border-color .3s ease",
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = CORAL)}
      onBlur={(e) => (e.currentTarget.style.borderColor = LINE_DARK)}
    />
  );
}

function ChipGrid({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
      }}
    >
      {options.map((opt) => {
        const active = value === opt;
        return (
          <motion.button
            key={opt}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(opt)}
            style={{
              padding: "12px 20px",
              borderRadius: 999,
              border: `1.5px solid ${active ? CORAL : LINE_DARK}`,
              background: active ? CORAL : "transparent",
              color: active ? INK : BG,
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "-0.005em",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background .25s ease, color .25s ease, border-color .25s ease",
            }}
          >
            {opt}
          </motion.button>
        );
      })}
    </div>
  );
}

function FooterNav({
  onNext,
  nextLabel,
  primary,
}: {
  onNext: () => void;
  nextLabel: string;
  primary?: boolean;
}) {
  return (
    <div
      style={{
        marginTop: "auto",
        paddingTop: 18,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 26px",
          borderRadius: 999,
          background: primary ? CORAL : BG,
          color: INK,
          border: "none",
          fontSize: 15,
          fontWeight: 500,
          letterSpacing: "0.01em",
          cursor: "pointer",
          fontFamily: "inherit",
          boxShadow: primary ? "0 10px 30px rgba(198,82,72,.35)" : "none",
        }}
      >
        {nextLabel} <span style={{ fontSize: 18 }}>→</span>
      </motion.button>
    </div>
  );
}

function FieldError({ msg }: { msg: string | null }) {
  return (
    <AnimatePresence>
      {msg ? (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            color: CORAL,
            fontSize: 13,
            letterSpacing: "0.01em",
          }}
        >
          {msg}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Summary({ data }: { data: Answers }) {
  const items = useMemo(
    () =>
      [
        { label: "·", value: data.name },
        { label: "·", value: data.email },
        { label: "·", value: data.project },
        { label: "·", value: data.budget },
      ].filter((i) => i.value),
    [data]
  );
  if (!items.length) return null;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        paddingTop: 6,
      }}
    >
      {items.map((it, i) => (
        <span
          key={i}
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.7)",
            fontSize: 12,
            letterSpacing: "0.01em",
          }}
        >
          {it.value}
        </span>
      ))}
    </div>
  );
}

function SuccessView({
  title,
  body,
  again,
  open,
  onAgain,
  onOpen,
}: {
  title: string;
  body: string;
  again: string;
  open: string;
  onAgain: () => void;
  onOpen: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        flex: 1,
        justifyContent: "center",
        textAlign: "left",
      }}
    >
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: CORAL,
          color: INK,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          fontWeight: 500,
        }}
      >
        ✓
      </motion.div>
      <h3
        style={{
          fontSize: "clamp(26px, 3.4vw, 40px)",
          lineHeight: 1.05,
          fontWeight: 500,
          letterSpacing: "-0.03em",
          margin: 0,
          color: BG,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          color: "rgba(255,255,255,0.65)",
          fontSize: 16,
          lineHeight: 1.5,
          maxWidth: 480,
        }}
      >
        {body}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 8,
        }}
      >
        <button
          type="button"
          onClick={onOpen}
          style={{
            padding: "12px 22px",
            borderRadius: 999,
            background: CORAL,
            color: INK,
            border: "none",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {open} →
        </button>
        <button
          type="button"
          onClick={onAgain}
          style={{
            padding: "12px 22px",
            borderRadius: 999,
            background: "transparent",
            color: BG,
            border: `1.5px solid ${LINE_DARK}`,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {again}
        </button>
      </div>
    </div>
  );
}
