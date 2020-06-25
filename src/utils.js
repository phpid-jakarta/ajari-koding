import { TAG_CLASSES, TAGS_MAPPING } from './constant.js';

export const getTagWithColor = (tags) => {
  return tags && tags.map((tag, i) => {
    const dataMapping = TAGS_MAPPING[tag.toLowerCase()];
    if (dataMapping) {
      return {
        tag,
        isMapped: true,
        ...dataMapping,
      };
    } else {
      let classes = TAG_CLASSES[0];

      const l = TAG_CLASSES.length;
      for (let index = l - 1; index >= 0; index--) {
        if (i % index === 0) {
          classes = TAG_CLASSES[index];
          break;
        }
      }

      return {
        tag,
        isMapped: false,
        classes,
      };
    }
  });
};

export const getDistinctTags = (allItems) => {
	let tags = new Set();
	let tagsWithCount = {};
	allItems.forEach(item => {
		item.topic_tags && item.topic_tags.forEach(element => {
			if (tags.has(element)) {
				tagsWithCount = {
					...tagsWithCount,
					[element]: tagsWithCount[element] + 1
				}
			} else {
				tags.add(element)
				tagsWithCount = {
					...tagsWithCount,
					[element]: 1
				}
			}
		});
	});

  const sortedTags = (Array.from(tags)).filter(it => tagsWithCount[it] > 1).sort((a, b) => tagsWithCount[b] - tagsWithCount[a]);

  return {
		tags: sortedTags,
		withCount: tagsWithCount,
	};
};

export const isHaveTag = (item, t) => {
	return item.topic_tags && item.topic_tags.find(i => i.toLowerCase() === t)
}
