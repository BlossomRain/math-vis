import { PageNotebookMeta } from '../../core/model'
import './Panels.css'

interface NotebookPanelProps {
  notebook?: PageNotebookMeta
}

export default function NotebookPanel({ notebook }: NotebookPanelProps) {
  if (!notebook) return null

  const hasContent = Boolean(
    notebook.summary ||
    notebook.goals?.length ||
    notebook.prompts?.length ||
    notebook.takeaways?.length ||
    notebook.sections?.length
  )

  if (!hasContent) return null

  return (
    <section className="panel-card notebook-panel">
      <div className="panel-eyebrow">数学笔记</div>
      {notebook.summary && <p className="notebook-summary">{notebook.summary}</p>}

      {notebook.goals && notebook.goals.length > 0 && (
        <div className="notebook-block">
          <h3 className="panel-title">学习目标</h3>
          <ul className="notebook-list">
            {notebook.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </div>
      )}

      {notebook.sections?.map((section) => (
        <div key={section.id} className="notebook-block">
          <h3 className="panel-title">{section.title}</h3>
          <div className="notebook-copy">
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}

      {notebook.prompts && notebook.prompts.length > 0 && (
        <div className="notebook-block">
          <h3 className="panel-title">观察提示</h3>
          <ul className="notebook-list is-prompts">
            {notebook.prompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>
        </div>
      )}

      {notebook.takeaways && notebook.takeaways.length > 0 && (
        <div className="notebook-block">
          <h3 className="panel-title">结论摘记</h3>
          <ul className="notebook-list is-takeaways">
            {notebook.takeaways.map((takeaway) => (
              <li key={takeaway}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
