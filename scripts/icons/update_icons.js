import fs from 'fs'
import path from 'path'

import * as simpleIcons from 'simple-icons'
import { icons as featherIcons } from 'feather-icons'

const icons = {};

for (const key in featherIcons) {
  const icon = featherIcons[key]
  icons[icon.name] = `<svg class="icon icon-${icon.name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><title>${icon.name}</title>${icon.contents}</svg>`
}

for (const key in simpleIcons) {
  const icon = simpleIcons[key]
  icons['brand-' + icon.slug] = `<svg class="icon icon-brand-${icon.slug}" viewBox="0 0 24 24" fill="currentColor"><title>${icon.title}</title><path d="${icon.path}"/></svg>`
}

fs.writeFileSync(
  path.join(import.meta.dirname, '../../data/m10c/icons.json'),
  JSON.stringify(icons, null, 2),
  'utf8',
)
