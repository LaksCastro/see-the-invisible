import EtherealColor from "ethereal-color";

const { Color } = EtherealColor;

const template = `
<div class="color-wrapper">
  <div class="color-raw" style="background: linear-gradient(135deg, {{colorOne}}, {{colorTwo}});"></div>
  <div class="color-data-wrapper">
    <div class="color-info-wrapper">
      <div class="color-info__demo" style="background: {{colorOne}};"></div>
      <div class="color-info__hex">{{colorOne}}</div>
    </div>
    <div class="color-info-wrapper">
      <div class="color-info__demo" style="background: {{colorTwo}}"></div>
      <div class="color-info__hex">{{colorTwo}}</div>
    </div>
  </div>
</div>
`;

window.addEventListener("DOMContentLoaded", function () {
  const { body, documentElement: doc } = document;

  function hasScroll(): boolean {
    return body.scrollHeight > body.clientHeight * 2;
  }

  function isTimeToLoadMore(): boolean {
    if (!hasScroll) return;

    const value = (100 * doc.scrollTop) / (doc.scrollHeight - doc.clientHeight);

    return value >= 50;
  }

  function getColorCombination(): string[] {
    const colorOne = Color();
    colorOne.random();

    const colorTwo = Color();
    colorTwo.random();

    return [colorOne.get("hex").string, colorTwo.get("hex").string];
  }

  function getColorCard([colorOne, colorTwo]: string[]): string {
    const card = template
      .replace(/{{colorOne}}/g, colorOne)
      .replace(/{{colorTwo}}/g, colorTwo);

    return card;
  }

  function renderColorCard(): void {
    body.innerHTML += getColorCard(getColorCombination());
  }

  function loadInitialColors(): void {
    renderColorCard();

    if (!hasScroll()) {
      loadInitialColors();
    }
  }

  loadInitialColors();

  window.onscroll = function renderOnScroll() {
    if (!isTimeToLoadMore()) {
      return;
    }

    renderColorCard();

    if (!hasScroll() || isTimeToLoadMore()) {
      renderOnScroll();
    }
  };
});
