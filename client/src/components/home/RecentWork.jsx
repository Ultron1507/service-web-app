import recentWork from '../../data/recentWork'

export default function RecentWork() {
  return <section className="content-section"><div className="section-heading"><div><h2>Recent work</h2><p>See the kind of care our technicians provide.</p></div><span>In your area</span></div><div className="recent-work">{recentWork.map((work) => <article className="work-card" key={work.caption}><img src={work.image} alt="" /><div><b>{work.caption}</b><small>{work.date}</small></div></article>)}</div></section>
}
