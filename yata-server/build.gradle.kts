import org.jooq.tools.jdbc.JDBCUtils

plugins {
    id("io.quarkus")
    id("org.jooq.jooq-codegen-gradle") version "3.20.2"
}

repositories {
    mavenCentral()
    mavenLocal()
}

val quarkusPlatformGroupId: String by project
val quarkusPlatformArtifactId: String by project
val quarkusPlatformVersion: String by project
val jooqVersion = "3.20.2"

dependencies {
    implementation("io.quarkus:quarkus-smallrye-openapi")
    implementation("io.quarkus:quarkus-flyway")
    implementation("io.quarkus:quarkus-agroal")
    implementation("io.quarkiverse.jdbc:quarkus-jdbc-sqlite:3.0.11")
    implementation(enforcedPlatform("${quarkusPlatformGroupId}:${quarkusPlatformArtifactId}:${quarkusPlatformVersion}"))
    implementation("io.quarkus:quarkus-rest-jackson")
    implementation("io.quarkus:quarkus-arc")
    implementation("io.quarkus:quarkus-rest")
    implementation("org.jooq:jooq:${jooqVersion}")

    testImplementation("io.quarkus:quarkus-junit5")
    testImplementation("io.rest-assured:rest-assured")

    jooqCodegen("org.xerial:sqlite-jdbc:3.49.1.0")
}

group = "dk.michaelbui"
version = "1.0.0-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

jooq{
    configuration{
        jdbc {
            driver = "org.sqlite.JDBC"
            url = "jdbc:sqlite:${System.getProperty("user.home")}/yata/yata.db"
        }

        generator {
            database{
                name = "org.jooq.meta.sqlite.SQLiteDatabase"
            }

            target {
                packageName = "generated"
                directory = layout.projectDirectory.dir("src/main/java/dk/michaelbui/yata/server").asFile.absolutePath
            }
        }
    }
}

tasks.withType<Test> {
    systemProperty("java.util.logging.manager", "org.jboss.logmanager.LogManager")
}
tasks.withType<JavaCompile> {
    options.encoding = "UTF-8"
    options.compilerArgs.add("-parameters")
}

