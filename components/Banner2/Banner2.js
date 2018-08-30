import React, { Component, Fragment } from "react";
if (typeof window !== "undefined") {
  $ = require("zepto");
}
import { observer } from "mobx-react";
import initStore from "../../Store/themeStore";
let Store = null;
@observer
export class Banner2 extends Component {
  componentDidMount() {
    Store = initStore();
    // Polyfill for requestAnimationFrame
    (function() {
      // eslint-disable-next-line
      let lastTime = 0;
      let vendors = ["ms", "moz", "webkit", "o"];

      for (
        let x = 0;
        x < vendors.length && !window.requestAnimationFrame;
        ++x
      ) {
        window.requestAnimationFrame =
          window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame =
          window[vendors[x] + "CancelAnimationFrame"] ||
          window[vendors[x] + "CancelRequestAnimationFrame"];
      }

      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
          let currTime = new Date().getTime();
          // eslint-disable-next-line
          let timeToCall = Math.max(0, 16 - (currTime - lastTime));
          let id = window.setTimeout(function() {
            callback(currTime + timeToCall);
          }, timeToCall);

          let lastTime = currTime + timeToCall;
          return id;
        };
      }

      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
        };
      }
    })();

    (function($, window) {
      function Constellation(canvas, options) {
        let $canvas = $(canvas),
          context = canvas.getContext("2d"),
          defaults = {
            star: {
              color: "rgba(255, 255, 255, 0.5)",
              width: 1,
              randomWidth: true
            },
            line: {
              color: "rgba(255, 255, 255, 0.5)",
              width: 0.2
            },
            position: {
              x: 0,
              y: 0
            },
            width: document.documentElement.clientWidth || window.innerWidth,
            height: document.documentElement.clientHeight || window.innerHeight,
            velocity: 0.1,
            length: 100,
            distance: 120,
            radius: 150,
            stars: []
          },
          config = $.extend(true, {}, defaults, options);

        function Star() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;

          this.vx = config.velocity * Math.random();
          this.vy = config.velocity * Math.random();

          this.vx = Math.random() > 0.5 ? this.vx : -this.vx;
          this.vy = Math.random() > 0.5 ? this.vy : -this.vy;

          this.radius = config.star.randomWidth
            ? Math.random() * config.star.width
            : config.star.width;

          this.draw = function() {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context.fill();
          };

          this.animate = function() {
            if (this.x < 0 || this.x > canvas.width) {
              this.vx = -this.vx;
            } else if (this.y < 0 || this.y > canvas.height) {
              this.vy = -this.vy;
            }

            this.x += this.vx;
            this.y += this.vy;
          };
        }

        this.createStars = function() {
          // eslint-disable-next-line
          let length = config.length;

          for (let i = 0; i < config.length; i++) {
            let newStar = new Star();
            config.stars.push(newStar);
          }
        };

        this.drawStars = function() {
          for (let i = 0; i < config.length; i++) {
            let star = config.stars[i];
            star.draw();
            star.animate();
          }
        };

        this.drawStarLines = function() {
          let iStar, jStar;

          for (let i = 0; i < config.length; i++) {
            for (let j = i + 1; j < config.length; j++) {
              iStar = config.stars[i];
              jStar = config.stars[j];

              let xDistance = Math.abs(iStar.x - jStar.x);
              let yDistance = Math.abs(iStar.y - jStar.y);

              if (xDistance < config.distance && yDistance < config.distance) {
                let xRadius = Math.abs(iStar.x - config.position.x);
                let yRadius = Math.abs(iStar.y - config.position.y);

                if (xRadius < config.radius && yRadius < config.radius) {
                  context.beginPath();
                  context.moveTo(iStar.x, iStar.y);
                  context.lineTo(jStar.x, jStar.y);
                  context.stroke();
                  context.closePath();
                }
              }
            }
          }
        };

        this.drawLoop = function() {
          context.clearRect(0, 0, canvas.width, canvas.height);
          this.drawStars();
          this.drawStarLines();

          window.requestAnimationFrame(
            function() {
              this.drawLoop();
            }.bind(this)
          );
        };

        this.init = function() {
          canvas.width = config.width;
          canvas.height = config.height;

          context.fillStyle = config.star.color;
          context.strokeStyle = config.line.color;
          context.lineWidth = config.line.width;

          if (!options || !options.hasOwnProperty("position")) {
            config.position = {
              x: canvas.width * 0.5,
              y: canvas.height * 0.5
            };
          }

          $canvas.on("mousemove", function(event) {
            config.position.x = event.pageX - $canvas.offset().left;
            config.position.y = event.pageY - $canvas.offset().top;
          });

          this.createStars();
          this.drawLoop();
        };
      }

      $.fn.constellation = function(options) {
        return this.each(function() {
          let c = new Constellation(this, options);
          c.init();
        });
      };
    })($, window);

    $("canvas").constellation({
      star: {
        color: Store.star,
        width: 2
      },
      line: {
        color: Store.line,
        width: 0.6
      },
      length:
        (document.documentElement.clientWidth || window.innerWidth) > 600
          ? 75
          : 35,
      distance: 120,
      radius: 150,
      velocity: 0.1
    });
  }

  render() {
    return (
      <Fragment>
        <div
          className={
            "ui vertical masthead center aligned segment" +
            (Store && !Store.themeToggle ? " inverted" : "")
          }
        >
          <div style={{ height: "300px" }}>
            <canvas style={{ zIndex: -100 }} />
          </div>
          <img
            //src={Store.imageUrl}
            src={
              Store && !Store.themeToggle ? "/static/0.png" : "/static/0.png"
            }
            className={this.props.className}
            alt={this.props.altText}
          />
          <div className="ui text container">
            <h1
              className={
                "ui header" +
                (Store && !Store.themeToggle
                  ? " inverted LSWolfAdjust"
                  : " LSCatAdjust")
              }
            >
              {this.props.headerText}
            </h1>
            <h2
              className={
                Store && Store.themeToggle ? " LSCatAdjust" : " LSWolfAdjust"
              }
            >
              {this.props.subheading}
            </h2>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Banner2;
