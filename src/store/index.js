import { writable, derived, readable } from 'svelte/store'
import { FILTER_ITEMS } from '../constant.js'
import data from '../../data-es'
import { getDistinctTags } from '../utils.js'

export const allData = readable(data.awesome_list, function set () {
  return function destroy () {}
})
export const showData = writable(data.awesome_list)
export const allDistictTags = derived(allData,
  ($allData) => {
    const r = getDistinctTags($allData)
    return r
  }
)

export const currentPage = writable(1)
export const perPage = writable(20)
export const offsetPage = derived(
  [currentPage, perPage],
  ([$currentPage, $perPage]) => {
    return $currentPage * $perPage - $perPage
  }
)
export const totalPage = derived(showData,
  ($showData) => {
    return $showData.length
  }
)

export const activeTag = writable('')
export const activeTab = writable(FILTER_ITEMS.ALL)

export const showBottomSheetFilter = writable(false)
export const showBottomSheetSort = writable(false)

export const activeTheme = writable('')
