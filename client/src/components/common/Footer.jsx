import { contact } from '../../data/contact'

export default function Footer() {
  return <footer className="site-footer"><div className="site-footer-business"><b>Take <em>Wind</em></b><span>Home service, made simple</span></div><div className="developer-credit"><a className="developer-contact" href={`mailto:${contact.developerEmail}`}>Created by Puspita</a></div></footer>
}
