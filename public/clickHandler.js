// todo 各listのimport/exportも
// todo カスタムメッセージを入れられるようにするか？

document.addEventListener("click", async function (event) {
  const clickedElement = event.target;
  if (clickedElement.tagName !== "A") {
    return;
  }

  const url = new URL(clickedElement.href);
  const destinationDomain = getDestinationDomain(url);

  event.preventDefault();

  const currentDomain = window.location.hostname;

  if (
    currentDomain !== "mail.google.com" ||
    (await isSafeDomain(destinationDomain))
  ) {
    openTargetHref(clickedElement.href);
    return;
  }

  var confirmResult = window.confirm(
    `💀💀💀標的型注意💀💀💀 「${destinationDomain}」は未確認のドメインです❗`
  );

  if (confirmResult) {
    openTargetHref(clickedElement.href);
  }
});

const openTargetHref = (href) => {
  window.open(href, "_blank");
};

const isSafeDomain = async (domain) => {
  const domains = await fetchSafeDomains();
  return domains.includes(domain);
};

const getDestinationDomain = (url) => {
  if (url.hostname === "www.google.com" && url.pathname === "/url") {
    const qParam = url.searchParams.get("q");
    const redirectUrl = new URL(qParam);
    return redirectUrl.hostname;
  }

  return url.hostname;
};

const fetchSafeDomains = async () => {
  const { domains } = await chrome.storage.local.get("domains");
  return domains ?? [];
};
