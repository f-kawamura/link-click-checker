// todo safeDomainListをカスタマイズ可能にする(localstorage)
// todo targetDomainをカスタマイズ可能にする(localstorage)
// todo 各listのimport/exportも
// todo カスタムメッセージを入れられるようにするか？
const safeDomainList = [
  "pc.moppy.jp"
]

document.addEventListener('click', function(event) {
  const clickedElement = event.target;
  if (clickedElement.tagName !== 'A') {
    return
  }

  const url = new URL(clickedElement.href);
  const destinationDomain = getDestinationDomain(url)

  if(isSafeDomain(destinationDomain)) {
    return
  }

  var confirmResult = window.confirm(`💀💀💀標的型注意💀💀💀 「${destinationDomain}」は未確認のドメインです❗`);
  if(!confirmResult) {
    event.preventDefault()
  }
});

const isSafeDomain = (domain) => {
  return safeDomainList.includes(domain)
}

const getDestinationDomain = (url)  => {
  if (url.hostname === 'www.google.com' && url.pathname === '/url') {
    const qParam = url.searchParams.get('q');
    const redirectUrl = new URL(qParam);
    return redirectUrl.hostname;
  }

  return url.hostname
}