/* globals Tour */

Tour.updatePlayerSize = function () {
  this.clientReact = this.domElement.getBoundingClientRect();
  this.width = this.clientReact.width;
  this.height = this.clientReact.height;

  this.safeAreaBottom = this.clientReact.height - window.innerHeight;

  this.camera.aspect = this.width / this.height;
  this.camera.updateProjectionMatrix();

  this.clientWidth = this.width;
  this.clientHeight = this.height;

  this.renderer.setSize(this.width, this.height);

  if (this.renderer.setPixelRatio) {
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  document.documentElement.style.setProperty(
    "--app-height",
    window.innerHeight + "px"
  );

  document.documentElement.style.setProperty(
    "--safe-area-bottom",
    this.safeAreaBottom + "px"
  );

  this.needsUpdate = true;
};

Tour.resize = function () {
  Tour.updatePlayerSize();
  // Bug fix for ios safari
  setTimeout(Tour.updatePlayerSize.bind(this), 500);
  Tour.emmit("resize");
};
