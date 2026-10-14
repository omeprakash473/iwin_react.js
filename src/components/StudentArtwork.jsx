import React, { useLayoutEffect, useRef, useState } from 'react';
const assetPathPrefix = (import.meta.env.BASE_URL + "assets/landing");
const imgRectangle2 = `${assetPathPrefix}/da1ad.png`;
const imgRectangle5 = `${assetPathPrefix}/98f9e.png`;
const imgRectangle8 = `${assetPathPrefix}/73f57.png`;
const imgRectangle11 = `${assetPathPrefix}/0bb0d.png`;
const imgAuthenticStudentMoment = `${assetPathPrefix}/0e600.png`;
const imgFrontViewMaleStudentGreenCheckeredShirtWearingBlackBackpackHoldingFilesSmilingBlueWallRemovebgPreview1 = `${assetPathPrefix}/0c908.png`;
const imgPortrait = `${assetPathPrefix}/e4100.png`;
const imgPortrait1 = `${assetPathPrefix}/e05af.png`;
const img59687641 = `${assetPathPrefix}/e0530.png`;
const img13840631 = `${assetPathPrefix}/d720b.png`;
const img44944851 = `${assetPathPrefix}/9b018.png`;
const img44944971 = `${assetPathPrefix}/17e7f.png`;
const imgRectangle = `${assetPathPrefix}/b0e34.svg`;
const imgRectangle1 = `${assetPathPrefix}/55edc.svg`;
const imgRectangle3 = `${assetPathPrefix}/96ceb.svg`;
const imgRectangle4 = `${assetPathPrefix}/cefcd.svg`;
const imgGroup = `${assetPathPrefix}/a508f.svg`;
const imgGroup1 = `${assetPathPrefix}/344ec.svg`;
const imgGroup2 = `${assetPathPrefix}/4a314.svg`;
const imgGroup3 = `${assetPathPrefix}/225e2.svg`;
const imgGroup4 = `${assetPathPrefix}/8ff49.svg`;
const imgGroup5 = `${assetPathPrefix}/c05d6.svg`;
const imgRectangle6 = `${assetPathPrefix}/4cef4.svg`;
const imgRectangle7 = `${assetPathPrefix}/be32a.svg`;
const imgGroup6 = `${assetPathPrefix}/24e0a.svg`;
const imgGroup7 = `${assetPathPrefix}/e15d4.svg`;
const imgGroup8 = `${assetPathPrefix}/2127c.svg`;
const imgGroup9 = `${assetPathPrefix}/4eb5e.svg`;
const imgGroup10 = `${assetPathPrefix}/07a6c.svg`;
const imgGroup11 = `${assetPathPrefix}/3ea12.svg`;
const imgGroup12 = `${assetPathPrefix}/a48a4.svg`;
const imgGroup13 = `${assetPathPrefix}/d036b.svg`;
const imgGroup14 = `${assetPathPrefix}/967a4.svg`;
const imgGroup15 = `${assetPathPrefix}/e7b46.svg`;
const imgGroup16 = `${assetPathPrefix}/7750e.svg`;
const imgGroup17 = `${assetPathPrefix}/bd049.svg`;
const imgGroup18 = `${assetPathPrefix}/00c78.svg`;
const imgGroup19 = `${assetPathPrefix}/27fc5.svg`;
const imgGroup20 = `${assetPathPrefix}/af492.svg`;
const imgGroup21 = `${assetPathPrefix}/89a9a.svg`;
const imgGroup22 = `${assetPathPrefix}/fad62.svg`;
const imgGroup23 = `${assetPathPrefix}/14d0a.svg`;
const imgGroup24 = `${assetPathPrefix}/bbd47.svg`;
const imgGroup25 = `${assetPathPrefix}/19fd8.svg`;
const imgGroup26 = `${assetPathPrefix}/8d736.svg`;
const imgRectangle9 = `${assetPathPrefix}/bf012.svg`;
const imgRectangle10 = `${assetPathPrefix}/a9cf8.svg`;
const imgSparkles = `${assetPathPrefix}/a1ff7.svg`;
const imgCompass = `${assetPathPrefix}/70642.svg`;
const imgHeartHandshake = `${assetPathPrefix}/01db1.svg`;
const imgRoute = `${assetPathPrefix}/e5b69.svg`;
const imgPolygon1 = `${assetPathPrefix}/fe708.svg`;
const imgVector = `${assetPathPrefix}/ce4b4.svg`;
const imgVector1 = `${assetPathPrefix}/7dc3f.svg`;
const imgVector2 = `${assetPathPrefix}/a734a.svg`;
const imgVector3 = `${assetPathPrefix}/0714c.svg`;
const imgVector4 = `${assetPathPrefix}/66b67.svg`;
const imgVector5 = `${assetPathPrefix}/cc36a.svg`;
const imgVector6 = `${assetPathPrefix}/5fb41.svg`;
const imgVector7 = `${assetPathPrefix}/3603f.svg`;
const imgVector8 = `${assetPathPrefix}/21a71.svg`;
const imgIconTarget = `${assetPathPrefix}/2e519.svg`;
const imgVector9 = `${assetPathPrefix}/16ca6.svg`;
const imgVector10 = `${assetPathPrefix}/fb6f8.svg`;
const imgIconStar = `${assetPathPrefix}/d76b3.svg`;
const imgVector11 = `${assetPathPrefix}/0001f.svg`;
const imgVector12 = `${assetPathPrefix}/cc989.svg`;
const imgVector13 = `${assetPathPrefix}/96d2a.svg`;
const imgCompassBuddy = `${assetPathPrefix}/b0d19.svg`;
const imgAward = `${assetPathPrefix}/44f71.svg`;
const imgLine = `${assetPathPrefix}/25328.svg`;


export default function StudentArtwork() {
 const ref = useRef(null);
 const [scale, setScale] = useState(1);
 useLayoutEffect(() => {
  const update = () => setScale(Math.min(1, ref.current.clientWidth / 615.431));
  update();
  const observer = new ResizeObserver(update);
  observer.observe(ref.current);
  return () => observer.disconnect();
 }, []);
 return <div className="student-artwork" ref={ref} style={{height: 499 * scale}}><div className="student-artwork-inner" style={{transform: `scale(${scale})`}}><div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="249:1778">
            <div className="col-start-1 ml-[33.27px] mt-0 relative row-start-1 size-[499px]" data-node-id="249:1779" data-name="Vector">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
            </div>
            <div className="col-start-1 ml-[415.83px] mt-[8.32px] relative row-start-1 size-[99.8px]" data-node-id="249:1780" data-name="Vector">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
            </div>
            <div className="col-start-1 ml-[53.23px] mt-[394.21px] relative row-start-1 size-[59.88px]" data-node-id="249:1781" data-name="Vector">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
            </div>
            <div className="col-start-1 h-[166.333px] ml-[58.22px] mt-[307.72px] relative row-start-1 w-[349.3px]" data-node-id="249:1782" data-name="Vector">
              <div className="absolute inset-[-1.2%_-0.57%]">
                <img alt="" className="block max-w-none size-full" src={imgVector3} />
              </div>
            </div>
            <div className="col-start-1 ml-[49.9px] mt-[465.73px] relative row-start-1 size-[16.633px]" data-node-id="249:1783" data-name="Vector">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector4} />
            </div>
            <div className="col-start-1 ml-[166.33px] mt-[316.03px] relative row-start-1 size-[16.633px]" data-node-id="249:1784" data-name="Vector">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
            </div>
            <div className="col-start-1 ml-[397.54px] mt-[297.74px] relative row-start-1 size-[19.96px]" data-node-id="249:1785" data-name="Vector">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector6} />
            </div>
            <div className="col-start-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[66px] place-items-start relative row-start-1" data-node-id="249:1786" data-name="Badge Career match">
              <div className="col-start-1 h-[63px] ml-0 mt-0 relative row-start-1 w-[189px]" data-node-id="249:1787" data-name="Vector">
                <div className="absolute inset-[-0.79%_-0.26%]">
                  <img alt="" className="block max-w-none size-full" src={imgVector7} />
                </div>
              </div>
              <div className="col-start-1 ml-[13.31px] mt-[13.01px] relative row-start-1 size-[36.593px]" data-node-id="249:1788" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector8} />
              </div>
              <div className="col-start-1 ml-[25.99px] mt-[25.69px] relative row-start-1 size-[11.227px]" data-node-id="249:1789" data-name="Icon target">
                <div className="absolute inset-[-6.68%]">
                  <img alt="" className="block max-w-none size-full" src={imgIconTarget} />
                </div>
              </div>
              <p className="[word-break:break-word] col-start-1 font-['DM_Sans'] font-normal h-[13px] leading-[normal] ml-[60px] mt-[16px] not-italic relative row-start-1 text-[#5b6285] text-[13px] w-[87px]" data-node-id="249:1791">
                Career match
              </p>
              <p className="[word-break:break-word] col-start-1 font-['DM_Sans'] font-bold h-[18px] leading-[normal] ml-[60px] mt-[33px] not-italic relative row-start-1 text-[#12163a] text-[18px] w-[111px]" data-node-id="249:1792">
                92% · Top 3
              </p>
            </div>
            <div className="col-start-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[449.1px] mt-[156.35px] place-items-start relative row-start-1" data-node-id="249:1793" data-name="Badge Aptitude">
              <div className="col-start-1 h-[63.207px] ml-0 mt-0 relative row-start-1 w-[166.333px]" data-node-id="249:1794" data-name="Vector">
                <div className="absolute inset-[-0.79%_-0.3%]">
                  <img alt="" className="block max-w-none size-full" src={imgVector9} />
                </div>
              </div>
              <div className="col-start-1 ml-[13.31px] mt-[13.31px] relative row-start-1 size-[36.593px]" data-node-id="249:1795" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector10} />
              </div>
              <div className="col-start-1 h-[10.541px] ml-[26.11px] mt-[25.99px] relative row-start-1 w-[10.978px]" data-node-id="249:1796" data-name="Icon star">
                <div className="absolute inset-[-7.11%_-6.83%_-7.12%_-6.83%]">
                  <img alt="" className="block max-w-none size-full" src={imgIconStar} />
                </div>
              </div>
              <p className="[word-break:break-word] col-start-1 font-['DM_Sans'] font-normal h-[13px] leading-[normal] ml-[59.9px] mt-[15.65px] not-italic relative row-start-1 text-[#5b6285] text-[13px] w-[56px]" data-node-id="249:1798">
                Aptitude
              </p>
              <p className="[word-break:break-word] col-start-1 font-['DM_Sans'] font-bold h-[18px] leading-[normal] ml-[59.9px] mt-[33.65px] not-italic relative row-start-1 text-[#12163a] text-[18px] w-[75px]" data-node-id="249:1799">
                25 skills
              </p>
            </div>
            <div className="col-start-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[403.36px] mt-[365.93px] place-items-start relative row-start-1" data-node-id="249:1800" data-name="Badge Progress">
              <div className="col-start-1 h-[71.523px] ml-0 mt-0 relative row-start-1 w-[191.283px]" data-node-id="249:1801" data-name="Vector">
                <div className="absolute inset-[-0.7%_-0.26%]">
                  <img alt="" className="block max-w-none size-full" src={imgVector11} />
                </div>
              </div>
              <p className="[word-break:break-word] col-start-1 font-['DM_Sans'] font-normal h-[13px] leading-[normal] ml-[19.64px] mt-[16.07px] not-italic relative row-start-1 text-[#5b6285] text-[13px] w-[115px]" data-node-id="249:1802">
                Pathway progress
              </p>
              <div className="col-start-1 h-[8.317px] ml-[19.96px] mt-[39.92px] relative row-start-1 w-[151.363px]" data-node-id="249:1803" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector12} />
              </div>
              <div className="col-start-1 h-[8.317px] ml-[19.96px] mt-[39.92px] relative row-start-1 w-[91.483px]" data-node-id="249:1804" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector13} />
              </div>
              <p className="[word-break:break-word] col-start-1 font-['DM_Sans'] font-bold h-[14px] leading-[normal] ml-[19.64px] mt-[52.07px] not-italic relative row-start-1 text-[#12163a] text-[13px] w-[146px]" data-node-id="249:1805">
                Stage 4 of 8 · Aptitude
              </p>
            </div>
            <div className="col-start-1 flex h-[404.19px] items-center justify-center ml-[113.11px] mt-[94.81px] relative row-start-1 w-[345.973px]" data-node-id="249:1806">
              <div className="-scale-y-100 flex-none rotate-180">
                <div className="h-[404.19px] relative rounded-[208px] w-[345.973px]" data-name="front-view-male-student-green-checkered-shirt-wearing-black-backpack-holding-files-smiling-blue-wall-removebg-preview 1">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[208px]">
                    <img alt="" className="absolute h-full left-[-50.96%] max-w-none top-0 w-[175.24%]" src={imgFrontViewMaleStudentGreenCheckeredShirtWearingBlackBackpackHoldingFilesSmilingBlueWallRemovebgPreview1} />
                  </div>
                </div>
              </div>
            </div>
          </div></div></div>;
}
