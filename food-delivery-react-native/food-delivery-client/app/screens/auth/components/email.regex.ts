/**
*  The W3C HTML5 specification:
https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
*/
export const EmailRegex: RegExp =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
