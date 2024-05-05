import { typesNavLink } from "./typesNavLinks";

export function routesToNavLinks(layout) {
  const baseUrl = layout.path;
  const routesAllow = layout.children.filter((route) => route.meta.allowForMenu);
  const baseLinks = routesAllow.map((route) => ({
    text: route.meta.title,
    url: route.path ? route.path : layout.path,
    icon: route.meta.icon,
    group: route.meta.group,
    type: typesNavLink.link,
  }));

  const outputGroupLinks = regroupLinkGroup(baseLinks);
  const outputLinks = baseLinks.filter((link) => !link.group);

  return [...outputLinks, ...outputGroupLinks];
}

function regroupLinkGroup(links) {
  const onlyLinksWithGroup = links.filter((link) => link.group);

  if (!onlyLinksWithGroup.length) {
    return [];
  }

  const groups = createGroup(onlyLinksWithGroup);

  for (let linkGroup of onlyLinksWithGroup) {
    for (let groupName in groups) {
      if (linkGroup.group === groupName) {
        const copyLink = { ...linkGroup };
        delete copyLink.group;
        groups[groupName].push(copyLink);
      }
    }
  }

  const output = [];

  for (let keyGroup in groups) {
    const finalLinkGroup = {
      name: keyGroup,
      type: typesNavLink.group,
      links: groups[keyGroup],
    };

    output.push(finalLinkGroup);
  }

  return output;
}
function createGroup(links) {
  const groups = {};

  for (let link of links) {
    const groupDoesntExist = !groups[link.group];
    if (groupDoesntExist) groups[link.group] = [];
  }

  return groups;
}
