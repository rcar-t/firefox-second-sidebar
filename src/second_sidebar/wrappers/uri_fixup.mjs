export class URIFixupWrapper {
  /**
   * Turns user-typed text (e.g. "example.com") into a full URL spec the way
   * the address bar does, without falling back to a keyword search. Input
   * typed without a scheme gets https, matching the new-panel suggestion.
   *
   * @param {string} text
   * @returns {string}
   * @throws NS_ERROR_MALFORMED_URI or NS_ERROR_FAILURE if no URL can be built.
   */
  static fixupURL(text) {
    const info = Services.uriFixup.getFixupURIInfo(
      text,
      Ci.nsIURIFixup.FIXUP_FLAG_FIX_SCHEME_TYPOS,
    );
    let uri = info.preferredURI;
    if (
      info.schemelessInput === Ci.nsILoadInfo.SchemelessInputTypeSchemeless &&
      uri.scheme === "http"
    ) {
      uri = uri.mutate().setScheme("https").finalize();
    }
    return uri.spec;
  }
}
