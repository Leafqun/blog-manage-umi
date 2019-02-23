export function defaultSelected(list) {
  if (list && list.length > 0) {
    let t = []
    for (let i in list) {
      t.push(list[i]['tid'])
    }
    return t
  } else {
    return []
  }
}
