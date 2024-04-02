FROM mcr.microsoft.com/dotnet/aspnet:8.0-jammy AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0-jammy AS build

WORKDIR /src
COPY ["WebApps/EShop.Web/EShop.Web.csproj", "WebApps/EShop.Web/"]
RUN dotnet restore "WebApps/EShop.Web/EShop.Web.csproj"
COPY . .
WORKDIR "/src/WebApps/EShop.Web"
RUN dotnet build "EShop.Web.csproj" -c Release -o /app/build

FROM node:12.18-alpine AS client 
ARG skip_client_build=false 
WORKDIR /app 
COPY ["WebApps/EShop.Web/ClientApp/", "."]
RUN  if [ "$skip_client_build" = "true" ] ; then echo "Skipping npm install" ; else npm install ; fi
RUN  if [ "$skip_client_build" = "true" ] ; then mkdir -p dist ; else npm run-script build -- --prod ; fi
FROM build AS publish
RUN dotnet publish "EShop.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
ENV ASPNETCORE_URLS http://*:8080
COPY --from=publish /app/publish .
COPY --from=client /app/dist /app/dist
ENTRYPOINT ["dotnet", "EShop.Web.dll"]