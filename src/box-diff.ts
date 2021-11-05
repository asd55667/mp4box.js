import { Box } from './box';

const DIFF_BOXES_PROP_NAMES = [
  'boxes',
  'entries',
  'references',
  'subsamples',
  'items',
  'item_infos',
  'extents',
  'associations',
  'subsegments',
  'ranges',
  'seekLists',
  'seekPoints',
  'esd',
  'levels',
];

const DIFF_PRIMITIVE_ARRAY_PROP_NAMES = [
  'compatible_brands',
  'matrix',
  'opcolor',
  'sample_counts',
  'sample_counts',
  'sample_deltas',
  'first_chunk',
  'samples_per_chunk',
  'sample_sizes',
  'chunk_offsets',
  'sample_offsets',
  'sample_description_index',
  'sample_duration',
];

function boxEqualFields(box_a: Box, box_b: Box) {
  if (box_a && !box_b) return false;

  for (const prop of Object.keys(box_a)) {
    if (DIFF_BOXES_PROP_NAMES.indexOf(prop) > -1) {
      continue;
      // } else if (excluded_fields && excluded_fields.indexOf(prop) > -1) {
      // 	continue;
    } else if (box_a[prop] instanceof Box || box_b[prop] instanceof Box) {
      continue;
    } else if (typeof box_a[prop] === 'undefined' || typeof box_b[prop] === 'undefined') {
      continue;
    } else if (typeof box_a[prop] === 'function' || typeof box_b[prop] === 'function') {
      continue;
    } else if (
      (box_a.subBoxNames && box_a.subBoxNames.indexOf(prop.slice(0, 4)) > -1) ||
      (box_b.subBoxNames && box_b.subBoxNames.indexOf(prop.slice(0, 4)) > -1)
    ) {
      continue;
    } else {
      if (
        prop === 'data' ||
        prop === 'start' ||
        prop === 'size' ||
        prop === 'creation_time' ||
        prop === 'modification_time'
      ) {
        continue;
      } else if (DIFF_PRIMITIVE_ARRAY_PROP_NAMES.indexOf(prop) > -1) {
        continue;
      } else {
        if (box_a[prop] !== box_b[prop]) {
          return false;
        }
      }
    }
  }
  return true;
}

function boxEqual(box_a: Box, box_b: Box) {
  if (!boxEqualFields(box_a, box_b)) {
    return false;
  }
  for (let j = 0; j < DIFF_BOXES_PROP_NAMES.length; j++) {
    const name = DIFF_BOXES_PROP_NAMES[j] as keyof Box;
    if (box_a[name] && box_b[name]) {
      if (!boxEqual(box_a[name], box_b[name])) {
        return false;
      }
    }
  }
  return true;
}

export default {
  DIFF_BOXES_PROP_NAMES: DIFF_BOXES_PROP_NAMES,

  DIFF_PRIMITIVE_ARRAY_PROP_NAMES: DIFF_PRIMITIVE_ARRAY_PROP_NAMES,

  boxEqualFields,

  boxEqual,
};
