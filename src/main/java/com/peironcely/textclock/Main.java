package com.peironcely.textclock;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.layout.StackPane;
import javafx.scene.text.Font;
import javafx.stage.Stage;

public class Main extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception{

        final double initialX = 800;
        final double initialY = 400;

        DigitalClock digitalClock = new DigitalClock();
        digitalClock.setPrefWidth(initialX);
        digitalClock.setPrefHeight(initialY);
        digitalClock.setAlignment(Pos.CENTER);
        digitalClock.setStyle("-fx-text-fill: white; -fx-font: 80px \"Serif\"; -fx-text-alignment: center;");

        StackPane rootPane = new StackPane(); // to center it
        rootPane.setStyle("-fx-background-color: black");
        rootPane.getChildren().add(digitalClock);

        Scene scene = new Scene(rootPane,initialX,initialY);

        digitalClock.scaleXProperty().bind(scene.widthProperty().divide(initialX));
        digitalClock.scaleYProperty().bind(scene.widthProperty().divide(initialX));

        primaryStage.setScene(scene);
        //primaryStage.setFullScreen(true);
        primaryStage.show();
    }


    public static void main(String[] args) {
        launch(args);
    }
}
