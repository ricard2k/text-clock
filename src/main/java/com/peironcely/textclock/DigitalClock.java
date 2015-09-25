package com.peironcely.textclock;

import javafx.animation.Animation;
import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.control.Label;
import javafx.util.Duration;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Time is the system time for the local timezone.
 */
class DigitalClock extends Label {

    private static final DateFormat SDF = new SimpleDateFormat("HH:mm");

    private Map<String, List<String>> data;
    private String currentTime = "";

    public DigitalClock() {
        try {
            data = initializeMap(this.getClass().getResourceAsStream("/russian.csv"));
        } catch (IOException e) {
            data = new HashMap<String, List<String>>();
        }
        setWrapText(true);
        bindToTime();
    }

    private Map<String, List<String>> initializeMap(InputStream csv) throws IOException {
        Map ret = new HashMap<String, List<String>>();
        String line = "";
        BufferedReader br = new BufferedReader(new InputStreamReader(csv));
        while ((line = br.readLine()) != null) {
            final String lineArray[] = line.split(",");
            if ((lineArray.length > 2) && (lineArray[0] != null) && !"".equals(lineArray[0].trim())){
                ret.put(lineArray[0], Arrays.asList(removeFirstElement(lineArray)));
            }

        }
        return ret;
    }

    private  String[] removeFirstElement(String[] input) {
        String ret[]=new String[input.length-1];
        System.arraycopy(input,1,ret,0,input.length-1);
        return ret;
    }

    // the digital clock updates once a second.
    private void bindToTime() {
        Timeline timeline = new Timeline(
                new KeyFrame(Duration.seconds(0), new EventHandler<ActionEvent>() {
                            @Override public void handle(ActionEvent actionEvent) {
                                final String time=SDF.format(new Date());
                                if (!time.equals(currentTime) ) {
                                    currentTime = time;
                                    final List<String> timeList = data.get(time);
                                    final int num = ThreadLocalRandom.current().nextInt(0, timeList.size());
                                    if ((time != null) && (!"".equals(timeList.get(num).trim()))) {
                                        final String str = timeList.get(num);
                                        System.out.println(str);
                                        setText(str);
                                    } else {
                                        setText(time);
                                    }
                                }
                            }
                        }
                ),
                new KeyFrame(Duration.seconds(1))
        );
        timeline.setCycleCount(Animation.INDEFINITE);
        timeline.play();
    }



}

