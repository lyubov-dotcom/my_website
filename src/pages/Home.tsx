import { useState } from 'react'
import { Link } from 'react-router-dom'

type Project = {
  title: string
  category: string
  year: string
  accent: string
  to?: string
}

const projects: Project[] = [
  { title: 'Octobank', category: 'Product Design · Case study', year: '2025', accent: '#2f6bff', to: '/case/bank-registration' },
  { title: 'Bloom Skincare', category: 'Brand Identity', year: '2025', accent: '#ff7ab6' },
  { title: 'Northwind Maps', category: 'Design System', year: '2024', accent: '#3ddc97' },
  { title: 'Cadence Music', category: 'Mobile App', year: '2024', accent: '#ffb457' },
]

const stats = [
  { value: '8+', label: 'Years designing' },
  { value: '60+', label: 'Products shipped' },
  { value: '12', label: 'Design awards' },
]

type FormState = { name: string; email: string; message: string }
type FormErrors = Partial<Record<keyof FormState, string>>

function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <>
      <div
        className="project-thumb"
        style={{ background: `linear-gradient(135deg, ${project.accent}, transparent 140%)` }}
      >
        <span className="project-year">{project.year}</span>
        {project.to && <span className="project-badge">View case →</span>}
      </div>
      <h3>{project.title}</h3>
      <p>{project.category}</p>
    </>
  )

  if (project.to) {
    return (
      <Link className="project-card project-card--link" to={project.to}>
        {inner}
      </Link>
    )
  }
  return <article className="project-card">{inner}</article>
}

function Home() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (values: FormState): FormErrors => {
    const next: FormErrors = {}
    if (!values.name.trim()) next.name = 'Please tell me your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'A valid email is required.'
    if (values.message.trim().length < 10) next.message = 'Message should be at least 10 characters.'
    return next
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSubmitted(true)
  }

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  return (
    <>
      <section id="top" className="hero">
        <p className="eyebrow">Product &amp; Brand Designer</p>
        <h1>
          Designing calm, <span className="accent">human</span> interfaces
          for ambitious teams.
        </h1>
        <p className="lede">
          I&rsquo;m Lyubov — I help startups and studios turn complex ideas into
          products people love to use. Clarity first, delight always.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#work">View selected work</a>
          <a className="btn btn-ghost" href="#contact">Start a project</a>
        </div>
        <ul className="stats">
          {stats.map((s) => (
            <li key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="work" className="work">
        <div className="section-head">
          <h2>Selected work</h2>
          <p>A few recent projects across product, brand, and systems.</p>
        </div>
        <div className="project-grid">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </section>

      <section id="about" className="about">
        <div className="section-head">
          <h2>About</h2>
        </div>
        <p className="about-copy">
          Over the last eight years I&rsquo;ve partnered with founders and product
          teams to ship interfaces that feel effortless. My work blends rigorous
          systems thinking with an eye for craft — typography, motion, and the
          small details that make a product sing.
        </p>
      </section>

      <section id="contact" className="contact">
        <div className="section-head">
          <h2>Let&rsquo;s work together</h2>
          <p>Tell me about your project and I&rsquo;ll get back within two days.</p>
        </div>

        {submitted ? (
          <div className="form-success" role="status">
            <span className="success-mark" aria-hidden="true">✓</span>
            <div>
              <strong>Thanks, {form.name.trim() || 'friend'}!</strong>
              <p>Your message is on its way. I&rsquo;ll reply to {form.email} soon.</p>
            </div>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" value={form.name} onChange={update('name')} aria-invalid={Boolean(errors.name)} placeholder="Ada Lovelace" />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={form.email} onChange={update('email')} aria-invalid={Boolean(errors.email)} placeholder="ada@studio.com" />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="field">
              <label htmlFor="message">Project details</label>
              <textarea id="message" rows={4} value={form.message} onChange={update('message')} aria-invalid={Boolean(errors.message)} placeholder="I'm building a…" />
              {errors.message && <span className="error">{errors.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary">Send message</button>
          </form>
        )}
      </section>
    </>
  )
}

export default Home
