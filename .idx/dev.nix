{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.sudo
  ];
  idx.extensions = [
    
  
 "eamodio.gitlens"
 "esbenp.prettier-vscode"
 "GitHub.vscode-pull-request-github"
 "ms-azuretools.vscode-docker"
 "Prisma.prisma"
 "Prisma.prisma-insider"
 "rangav.vscode-thunder-client"];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}