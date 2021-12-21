lines = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines
enhancement = lines[0].chomp

image = lines.drop(2).map(&:chomp).reject(&:empty?)
height = image.size
width = image[0].size
total_lit_pixels = 0

default_chars = ['.', enhancement[0]]

2.times do |turn|
  total_lit_pixels = 0
  transformed_image = (height + 2).times.map { [nil] * (width + 2) }

  (-1...height + 1).each do |i|
    (-1...width + 1).each do |j|
      num = 0
      offset = 1

      (i + 1).downto(i - 1).each do |y|
        (j + 1).downto(j - 1).each do |x|
          valid_pixel = x >= 0 && x < width && y >= 0 && y < height

          char = valid_pixel ? image[y][x] : default_chars[turn % 2]
          num |= offset if char == '#'

          offset <<= 1
        end
      end

      transformed_image[i + 1][j + 1] = enhancement[num]
      total_lit_pixels += 1 if enhancement[num] == '#'
    end
  end

  image = transformed_image
  width += 2
  height += 2
end

puts total_lit_pixels
