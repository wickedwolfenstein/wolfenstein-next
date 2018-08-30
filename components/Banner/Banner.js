import React, { Fragment } from 'react';

const banner = props => {
  return (
    <Fragment>
      <div
        className={
          'ui vertical center aligned segment' +
          (props.masthead ? ' masthead' : '') +
          (props.inverted ? ' inverted' : '') +
          (props.background ? ' bannerbg' : '')
        }
        style={{
          backgroundImage:
            'url(' + (props.background ? props.imageUrl : '') + ')',
        }}
      >
        {!props.background ? (
          <img
            src={props.imageUrl}
            className={props.className}
            alt={props.altText}
          />
        ) : (
          ''
        )}

        <div className="ui text container">
          <h1 className={'ui header' + (props.inverted ? ' inverted' : '')}>
            {props.headerText}
          </h1>
          <h2>{props.subheading}</h2>
        </div>
      </div>
    </Fragment>
  );
};

export default banner;
