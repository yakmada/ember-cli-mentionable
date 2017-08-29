export default function($element, event, object) {
  $element.trigger(window.jQuery.Event(event, object)); // eslint-disable-line new-cap
  return;
}
