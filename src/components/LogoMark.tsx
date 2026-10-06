type LogoMarkProps = {
  className?: string
  title?: string
}

function LogoMark({ className, title }: LogoMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="256" cy="256" r="166.35" stroke="currentColor" strokeWidth="26" />
      <path
        fill="currentColor"
        d="M326 332.5 298 332.5 256 227.5 213 332.5 184.5 332 255 159.5Z"
      />
    </svg>
  )
}

export default LogoMark
