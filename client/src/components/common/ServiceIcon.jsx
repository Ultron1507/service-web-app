export default function ServiceIcon({ icon, label, active = false, onClick }) {
  return <button type="button" className={`service-icon ${active ? 'active' : ''}`} aria-label={label} onClick={onClick}><span><i className={icon} aria-hidden="true" /></span><small>{label}</small></button>
}
