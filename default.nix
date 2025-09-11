{ stdenvNoCC, python3Packages }:

stdenvNoCC.mkDerivation {
  name = "ocf-tempalte";
  src = ./.;

  nativeBuildInputs = with python3Packages; [
  ];

  buildPhase = ''
   python template.py ./www/index.html.tmpl ./www/templates ./www/index.html
  '';

}
