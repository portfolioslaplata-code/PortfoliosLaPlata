import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Download, FileText, Maximize2, Quote, Sparkles, UserRound } from "lucide-react";

function Lines() {
  return <span className="preview-lines"><i /><i /><i /></span>;
}

function Art({ index = 0 }) {
  return <span className={`preview-art preview-art-${index % 3}`}><i /><b /></span>;
}

// Static, decorative miniatures: no pretend buttons, images or extra libraries.
export default function SectionPreview({ preview, size = "card" }) {
  const { type, title, labels } = preview;
  let content;
  switch (type) {
    case "download":
      content = <div className="preview-download"><div className="preview-document"><FileText size={26} strokeWidth={1.3} /><div><strong>{labels[0]}</strong><small>{labels[1]}</small></div><Lines /></div><div className="preview-download-link"><span>{labels[2]}</span><Download size={18} /></div></div>;
      break;
    case "about":
      content = <div className="preview-about"><span className="preview-avatar"><UserRound size={38} strokeWidth={1.2} /></span><div><strong>{title}</strong><p>{labels[0]}</p><Lines /><small>{labels[1]}</small></div></div>;
      break;
    case "list":
    case "certificates":
      content = <div className="preview-list">{labels.map((label, i) => <div key={label}>{type === "certificates" ? <BadgeCheck size={26} /> : <span className="preview-list-number">0{i + 1}</span>}<div><strong>{label}</strong><Lines /></div></div>)}</div>;
      break;
    case "cards":
    case "catalog":
    case "services":
      content = <div className={`preview-cards preview-cards-${type}`}>{labels.map((label, i) => <div key={label}>{type === "services" ? <Sparkles size={22} /> : <Art index={i} />}<strong>{label}</strong><Lines />{type === "catalog" && <ArrowUpRight size={13} />}</div>)}</div>;
      break;
    case "tags":
      content = <div className="preview-tags">{labels.map((label) => <span key={label}>{label}</span>)}</div>;
      break;
    case "gallery":
      content = <div className="preview-gallery">{[0, 1, 2, 1].map((index, i) => <Art key={i} index={index} />)}</div>;
      break;
    case "logos":
      content = <div className="preview-logos">{labels.map((label) => <strong key={label}>{label}</strong>)}</div>;
      break;
    case "metrics":
    case "results":
      content = <div className={`preview-metrics preview-metrics-${type}`}>{labels.map((label) => { const [number, text] = label.split("|"); return <div key={label}><strong>{number}</strong><span>{text}</span>{type === "results" && <span className="preview-bars"><i /><i /><i /><i /><i /></span>}</div>; })}</div>;
      break;
    case "slider":
      content = <div className="preview-slider"><Art /><div><ArrowLeft size={16} /><span>{labels[0]}</span><ArrowRight size={16} /></div></div>;
      break;
    case "case":
      content = <div className="preview-case"><Art index={2} /><div>{labels.map((label, i) => <div key={label}><span>0{i + 1}</span><strong>{label}</strong><i /></div>)}</div></div>;
      break;
    case "expanded":
      content = <div className="preview-expanded"><div className="preview-gallery"><Art /><Art index={1} /><Art index={2} /></div><div className="preview-lightbox"><Art index={1} /><span>{labels[0]}<Maximize2 size={13} /></span></div></div>;
      break;
    case "timeline":
      content = <div className="preview-timeline">{labels.map((label) => { const [year, text] = label.split("|"); return <div key={label}><span>{year}</span><i /><div><strong>{text}</strong><Lines /></div></div>; })}</div>;
      break;
    case "quote":
      content = <div className="preview-quote"><Quote size={26} /><strong>{labels[0]}</strong><span>{labels[1]}</span></div>;
      break;
    case "comparison":
      content = <div className="preview-comparison">{labels.map((label, i) => <div key={label}><Art index={i} /><span>{label}</span></div>)}<i className="preview-divider">↔</i></div>;
      break;
    default:
      content = <Lines />;
  }
  return <div className={`section-preview section-preview-${type} section-preview-${size}`} aria-hidden="true"><div className="preview-window"><div className="preview-window-bar"><span /><span /><span /><i /></div>{type !== "about" && <p className="preview-title">{title}</p>}{content}</div></div>;
}
