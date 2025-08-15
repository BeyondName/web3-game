import SwiftUI

struct ContentView: View {
    @State private var connectionStatus: String = "Not connected"

    var body: some View {
        VStack(spacing: 20) {
            Text("Web3 Game")
                .font(.largeTitle)
                .fontWeight(.bold)

            Text(connectionStatus)
                .font(.subheadline)
                .foregroundColor(.secondary)

            Button("Connect Wallet") {
                connectWallet()
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }

    private func connectWallet() {
        // Placeholder for wallet connection logic.
        connectionStatus = "Wallet connected"
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
