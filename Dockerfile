FROM openjdk:17-ea-jdk-alpine3.13 as build
COPY . /usr/app
WORKDIR /usr/app
RUN chmod +x mvnw && ./mvnw clean package

FROM openjdk:17-ea-jdk-alpine3.13
COPY --from=build /usr/app/target/*.jar app.jar
EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]