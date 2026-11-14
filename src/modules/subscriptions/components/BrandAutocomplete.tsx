import { CustomInput } from '@/modules/common/components/CustomInput';
import { getBrandIconUrl } from '@/modules/common/utils/icons.utils';
import { autocompleteStyles } from '@/modules/subscriptions/recipes/autocomplete.recipe';
import { BrandPreset } from '@/modules/subscriptions/utils/brandPresets.utils';

interface BrandAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: BrandPreset[];
  onSelectPreset: (preset: BrandPreset) => void;
  iconSlug?: string | null;
  websiteUrl?: string | null;
}

export function BrandAutocomplete({
  value,
  onChange,
  suggestions,
  onSelectPreset,
  iconSlug,
  websiteUrl,
}: BrandAutocompleteProps) {
  const classes = autocompleteStyles();
  const iconUrl = getBrandIconUrl(iconSlug ?? null, websiteUrl ?? null);

  const previewAdornment = iconUrl ? (
    <img
      src={iconUrl}
      alt=""
      width={20}
      height={20}
      style={{ borderRadius: '4px', objectFit: 'contain' }}
    />
  ) : null;

  return (
    <div className={classes.root}>
      <CustomInput
        label="Service name"
        required
        placeholder="e.g. Netflix, Spotify, Claude, AWS"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        leftAdornment={previewAdornment}
      />
      {suggestions.length > 0 && (
        <div className={classes.menu} role="listbox">
          {suggestions.map((item) => {
            const itemIconUrl = getBrandIconUrl(item.iconSlug, item.websiteUrl);
            return (
              <button
                key={item.name}
                type="button"
                role="option"
                aria-selected="false"
                onClick={() => onSelectPreset(item)}
                className={classes.item}
              >
                <div
                  className={classes.icon}
                  style={{ background: item.brandColor, overflow: 'hidden' }}
                >
                  {itemIconUrl ? (
                    <img
                      src={itemIconUrl}
                      alt=""
                      width={16}
                      height={16}
                      style={{ objectFit: 'contain' }}
                    />
                  ) : (
                    item.name.slice(0, 2).toUpperCase()
                  )}
                </div>
                <span className={classes.name}>{item.name}</span>
                <span className={classes.category}>{item.category}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
