import fetch from 'isomorphic-unfetch';

export async function fetchMemberDriveStatus() {
  const memberDriveStatusData = await fetch('/api/memberdrivestatus');
  const memberDriveStatus = await memberDriveStatusData.json();
  return memberDriveStatus;
}

export function addMemberDriveElements(data) {
  const rootEle = document.getElementById('__next');
  let adsAreRunning = false;
  if (
    data.webshowad &&
    !document.getElementById('membership-ad-frame-wrapper')
  ) {
    const div = document.createElement('div');
    div.id = 'membership-ad-frame-wrapper';
    div.className = 'advert';

    const admbl = document.createElement('div');
    admbl.id = 'membership-ad-mobile';

    const ad = document.createElement('div');
    ad.id = 'membership-ad';

    div.append(admbl);
    div.append(ad);
    rootEle.append(div);
    adsAreRunning = true;
  }
  if (data.pushdownshowad && !document.getElementById('pushdown-ad')) {
    const pddiv = document.createElement('div');
    pddiv.id = 'pushdown-ad';
    rootEle.prepend(pddiv);
    adsAreRunning = true;
  }
  if (
    data.splashshowad &&
    !document.getElementById('membership-splash-frame-wrapper')
  ) {
    const splashdiv = document.createElement('div');
    splashdiv.id = 'membership-splash-frame-wrapper';
    rootEle.append(splashdiv);
    adsAreRunning = true;
  }
  if (adsAreRunning) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'getMembershipAdSlot'
    });
  }
}
