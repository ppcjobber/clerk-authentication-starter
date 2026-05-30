import ArchiveClient from "./ArchiveClient";

export const metadata = {
  title: "Meeting Archive — Every UK & Irish Card Analysed",
  description: "Browse every UK and Irish horse racing meeting analysed by PaceMap. Race shape, pace scenarios, watch points — searchable by course and date.",
};

export default function ArchivePage() {
  return <ArchiveClient />;
}
