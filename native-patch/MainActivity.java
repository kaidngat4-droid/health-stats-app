package ye.moh.healthstats;

import android.os.Bundle;
import android.print.PrintAttributes;
import android.print.PrintManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onStart() {
    super.onStart();
    final WebView web = getBridge().getWebView();
    web.addJavascriptInterface(new Object() {
      @JavascriptInterface
      public void print() {
        runOnUiThread(new Runnable() {
          public void run() {
            PrintManager pm = (PrintManager) getSystemService(PRINT_SERVICE);
            pm.print("تقرير الإحصاء الصحي",
              web.createPrintDocumentAdapter("report"),
              new PrintAttributes.Builder().build());
          }
        });
      }
    }, "AndroidPrint");
  }
}
