allprojects {
    group = "dk.michaelbui"
    version = "0.1.0-SNAPSHOT"
}

tasks.register("clean") {
    dependsOn(
        ":yata-server:clean",
        ":yata-client:npmClean",
    )
}

tasks.register("build") {
    dependsOn(
        ":yata-server:build",
        ":yata-client:npmBuild",
    )
}