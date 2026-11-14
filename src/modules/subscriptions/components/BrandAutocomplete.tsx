import { CustomInput } from '@/modules/common/components/CustomInput';
import { autocompleteStyles } from '@/modules/subscriptions/recipes/autocomplete.recipe';
import { BrandPreset } from '@/modules/subscriptions/utils/brandPresets.utils';

interface BrandAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: BrandPreset[];
  onSelectPreset: (preset: BrandPreset) => void;
}

export function BrandAutocomplete({
  value,
  onChange,
  suggestions,
  onSelectPreset,
}: BrandAutocompleteProps) {
  const classes = autocompleteStyles();

  return (
    <div className={classes.root}>
      <CustomInput
        label="Service name"
        required
        placeholder="e.g. Netflix, Spotify, Claude, AWS"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {suggestions.length > 0 && (
        <div className={classes.menu} role="listbox">
          {suggestions.map((item) => (
            <button
              key={item.name}
              type="button"
              role="option"
              aria-selected="false"
              onClick={() => onSelectPreset(item)}
              className={classes.item}
            >
              <div className={classes.icon} style={{ background: item.brandColor }}>
                {item.name.slice(0, 2).toUpperCase()}
              </div>
              <span className={classes.name}>{item.name}</span>
              <span className={classes.category}>{item.category}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
