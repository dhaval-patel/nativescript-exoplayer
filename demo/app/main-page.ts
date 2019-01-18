import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import { HelloWorldModel } from './main-view-model';
import { isAndroid, device } from "platform";
import { Color } from "color";
import { android } from "application";
import  {addOrientationApplier, enableRotation} from 'nativescript-orientation';

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: EventData) {
    // Get the event sender
    let page = <Page>args.object;
    page.bindingContext = new HelloWorldModel(page);

    if (isAndroid && device.sdkVersion >= "21") {
        let window = android.startActivity.getWindow();
        window.setStatusBarColor(new Color("#d32f2f").android);
    }

    enableRotation();

    addOrientationApplier((args) => {
        if (args.landscape) {
            page.bindingContext._videoPlayer.setFullScreen();
        } else {
            page.bindingContext._videoPlayer.hideFullScreen();
        }
    });
}