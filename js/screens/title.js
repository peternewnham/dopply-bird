game.TitleScreen = me.ScreenObject.extend({
  init: function () {
    this._super(me.ScreenObject, 'init');
    this.font = null;
    this.ground1 = null;
    this.ground2 = null;
    this.logo = null;
  },

  onResetEvent: function () {
    me.audio.stop("theme");
    game.data.newHiScore = false;

    me.game.world.addChild(new BackgroundLayer('bg', 1));
    me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    me.input.bindKey(me.input.KEY.SPACE, "enter", true);
    me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);

    game.doppler.callback = function() {

      // simulate space bar key down
      me.input.triggerKeyEvent(me.input.KEY.ENTER, true);

      // key up after 200ms for next action
      setTimeout(function () {
        me.input.triggerKeyEvent(me.input.KEY.ENTER, false);
      }, 200);

    };

    this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "enter") {
        me.state.change(me.state.PLAY);
      }
    });

    //logo
    var logoImg = me.loader.getImage('logo');
    this.logo = new me.Sprite(
      me.game.viewport.width / 2 - 170,
      -logoImg,
      logoImg
    );
    me.game.world.addChild(this.logo, 10);

    var that = this;
    var logoTween = me.pool.pull("me.Tween", this.logo.pos)
      .to({y: me.game.viewport.height / 2 - 100}, 1000)
      .easing(me.Tween.Easing.Exponential.InOut).start();

    this.ground1 = me.pool.pull("ground", 0, me.video.renderer.getHeight() - 96);
    this.ground2 = me.pool.pull("ground", me.video.renderer.getWidth(),
      me.video.renderer.getHeight() - 96);
    me.game.world.addChild(this.ground1, 11);
    me.game.world.addChild(this.ground2, 11);

    me.game.world.addChild(new (me.Renderable.extend({
      // constructor
      init: function () {
        // size does not matter, it's just to avoid having a zero size
        // renderable
        this._super(me.Renderable, 'init', [0, 0, 100, 100]);
        this.text1 = 'Allow access to your microphone';
        this.text2 = 'Swipe your hand upwards past it to start the game and make the bird fly!';
        //this.text = me.device.touch ? 'Tap to start' : 'PRESS SPACE OR CLICK LEFT MOUSE BUTTON TO START \n\t\t\t\t\t\t\t\t\t\t\tPRESS "M" TO MUTE SOUND';
        this.font = new me.Font('gamefont', 20, '#000');
      },
      draw: function (renderer) {
        var context = renderer.getContext();

        var text1Measure = this.font.measureText(context, this.text1);
        var xpos = me.game.viewport.width / 2 - text1Measure.width / 2;
        var ypos = me.game.viewport.height / 2 + 50;
        this.font.draw(context, this.text1, xpos, ypos);

        var text2Measure = this.font.measureText(context, this.text2);
        var xpos = me.game.viewport.width / 2 - text2Measure.width / 2;
        var ypos = me.game.viewport.height / 2 + 75;
        this.font.draw(context, this.text2, xpos, ypos);



      }
    })), 12);
  },

  onDestroyEvent: function () {
    // unregister the event
    me.event.unsubscribe(this.handler);
    me.input.unbindKey(me.input.KEY.ENTER);
    me.input.unbindKey(me.input.KEY.SPACE);
    me.input.unbindPointer(me.input.mouse.LEFT);
    this.ground1 = null;
    this.ground2 = null;
    me.game.world.removeChild(this.logo);
    this.logo = null;
  }
});
