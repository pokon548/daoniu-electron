# Copyright (c) 2003-2021 Eelco Dolstra and the Nixpkgs/NixOS contributors
#
# Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the
# "Software"), to deal in the Software without restriction, including
# without limitation the rights to use, copy, modify, merge, publish,
# distribute, sublicense, and/or sell copies of the Software, and to
# permit persons to whom the Software is furnished to do so, subject to
# the following conditions:
#
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
# LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
# OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
# WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

{ pkgs ? import <nixpkgs> {} }:

(pkgs.buildFHSUserEnv {
  name = "electron-env";
  targetPkgs = pkgs: (with pkgs;
    [
      nodejs python3 libcxx systemd libpulseaudio libdrm mesa stdenv.cc.cc
      alsa-lib atk at-spi2-atk at-spi2-core cairo cups dbus expat fontconfig
      freetype gdk-pixbuf glib gtk3 libnotify libuuid nspr nss pango systemd
      libappindicator-gtk3 libdbusmenu libxkbcommon zlib yarn wine wine64 ungoogled-chromium
      cairo pango libjpeg libpng giflib librsvg pixman pkg-config glibc gcc_debug binutils stdenv.cc.cc.lib
      clang llvmPackages.bintools rustup rust-analyzer
    ]
  ) ++ (with pkgs.xorg;
    [
      libXScrnSaver libXrender libXcursor libXdamage libXext libXfixes libXi
      libXrandr libX11 libXcomposite libxshmfence libXtst libxcb
    ]
  );
}).env
