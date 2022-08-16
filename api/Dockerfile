FROM gradle:7.5-jdk-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN ./gradlew build --no-daemon
RUN ls -la

FROM openjdk:18-slim
EXPOSE 8080
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/api-0.0.1-SNAPSHOT.jar /app/spring-boot-application.jar
ENTRYPOINT ["java", "-jar", "/app/spring-boot-application.jar", "--spring.profiles.active=dev"]
