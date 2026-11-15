import { ChevronDown } from 'lucide-react';
import { useLandingFaq } from '@/modules/landing/hooks/useLandingFaq';
import { appleFaqStyles } from '@/modules/landing/recipes/appleFaq.recipe';
import { APPLE_FAQS } from '@/modules/landing/utils/appleFaq.data';

export function AppleFaq() {
  const classes = appleFaqStyles();
  const { toggleFaq, isOpen } = useLandingFaq('apple-privacy');

  return (
    <section id="faq" className={classes.section}>
      <div className={classes.header}>
        <span className={classes.eyebrow}>Questions</span>
        <h2 className={classes.title}>Frequently asked.</h2>
      </div>

      <div className={classes.list}>
        {APPLE_FAQS.map((faq) => {
          const open = isOpen(faq.id);
          return (
            <div key={faq.id} className={classes.item}>
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className={classes.button}
                aria-expanded={open}
                aria-controls={`faq-body-${faq.id}`}
              >
                <span className={classes.question}>{faq.question}</span>
                <ChevronDown
                  size={15}
                  className={classes.icon}
                  style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {open && (
                <div id={`faq-body-${faq.id}`} className={classes.answer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
