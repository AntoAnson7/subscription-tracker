import { ChevronDown } from 'lucide-react';
import { useLandingFaq } from '@/modules/landing/hooks/useLandingFaq';
import { landingFaqStyles } from '@/modules/landing/recipes/landingFaq.recipe';
import { LANDING_FAQS } from '@/modules/landing/utils/landingFaq.data';

export function LandingFaqSection() {
  const classes = landingFaqStyles();
  const { toggleFaq, isOpen } = useLandingFaq();

  return (
    <section id="faq" className={classes.section}>
      <div className={classes.header}>
        <div className={classes.tag}>Frequently Asked Questions</div>
        <h2 className={classes.title}>Got Questions? We&apos;ve Got Answers.</h2>
        <p className={classes.subtitle}>
          Everything you need to know about SubTrack&apos;s privacy, automation, and features.
        </p>
      </div>

      <div className={classes.accordionList}>
        {LANDING_FAQS.map((faq) => {
          const open = isOpen(faq.id);
          return (
            <div key={faq.id} className={classes.item}>
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className={classes.questionBtn}
                aria-expanded={open}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className={classes.questionText}>{faq.question}</span>
                <ChevronDown
                  size={16}
                  className={classes.chevron}
                  style={{
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {open && (
                <div id={`faq-answer-${faq.id}`} className={classes.answerContainer}>
                  <p className={classes.answerText}>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
