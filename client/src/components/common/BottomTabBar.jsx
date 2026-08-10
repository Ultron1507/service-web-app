import { NavLink } from 'react-router-dom'

const tabs = [['ri-home-5-line', 'Home', '/home'], ['ri-temp-cold-line', 'AC', '/services/ac'], ['ri-fridge-line', 'Fridge', '/services/fridge'], ['ri-settings-3-line', 'Washer', '/services/washing'], ['ri-more-2-line', 'More', '/more']]

export default function BottomTabBar() {
  return <nav className="bottom-tabs" aria-label="Main navigation">{tabs.map(([icon, label, to]) => <NavLink key={label} end={label === 'Home'} to={to}><i className={icon} aria-hidden="true" /><small>{label}</small></NavLink>)}</nav>
}
