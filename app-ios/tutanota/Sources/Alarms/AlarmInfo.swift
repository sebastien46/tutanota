import Foundation

struct EncryptedAlarmInfo : Codable {
  let alarmIdentifier: String
  let trigger: Base64
}

enum AlarmIntervalUnit : String {
  case minute = "M"
  case hour = "H"
  case day = "D"
  case week = "W"
}

struct AlarmInterval : Equatable {
  let unit: AlarmIntervalUnit
  let value: Int
}

extension AlarmInterval : SimpleStringDecodable {
  init?(string: String) {
    let regex = try! NSRegularExpression(pattern: "^([0-9]+)([MHDW])$")
    let matches = regex.matches(in: string, range: NSMakeRange(0, string.utf16.count))
    if matches.count != 1 {
      return nil
    }
    let digitsString = (string as NSString).substring(with: matches[0].range(at: 1))
    let unitString = (string as NSString).substring(with: matches[0].range(at: 2))
    
    guard let value = Int(string: digitsString) else {
      return nil
    }
    
    guard let unit = AlarmIntervalUnit(rawValue: unitString) else {
      return nil
    }
    
    self.init(unit: unit, value: value)
  }
}

struct AlarmInfo : Equatable {
  /// Unique identifier of the alarm
  let alarmIdentifer: String
  /// How long before the event should alarm fire.
  /// Contains values like in ical spec (e.g. 5M or 3D) but we only support certain subset of it
  let trigger: AlarmInterval
}

extension AlarmInfo {
  init(encrypted: EncryptedAlarmInfo, sessionKey: Key) throws {
    self.alarmIdentifer = encrypted.alarmIdentifier
    self.trigger = try decrypt(base64: encrypted.trigger, key: sessionKey)
  }
}
